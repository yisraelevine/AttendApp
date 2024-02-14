import { HDate } from "@hebcal/core";
import { AttendanceRecord } from "./interfaces";

interface Record {
    date: {
        date: string
        date_number: number
        day_number: number
        month_number: number
        year_number: number
        week_number: number

        hdate_string: string
        hmonth_number: number
        hyear_number: number
        hweek_number: number
    }
    arrived: boolean | null
    time_in: string | null
    time_out: string | null
    text: string | null
}

export class PastRecords {
    public daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    public daysOfHWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
    public records: Record[] = []
    public recordsByMonth: { name: string, records: Record[] }[]
    public recordsByHMonth: { name: string, records: Record[] }[]
    constructor(records: AttendanceRecord[], registration_date: string | null) {
        this.records = this.generateRecords(records, registration_date)
        this.recordsByMonth = this.groupByMonth()
        this.recordsByHMonth = this.groupByHMonth()
    }
    private getMonths(): { m: number, y: number }[] {
        return [...new Set(
            this.records.map(e => JSON.stringify({ m: e.date.month_number, y: e.date.year_number }))
        )].map(e => JSON.parse(e))
    }
    private getRecordsByMonth(month: number, year: number) {
        return this.records.filter(e => e.date.month_number === month && e.date.year_number === year)
    }
    private groupByMonth(): { name: string, records: Record[] }[] {
        return this.getMonths().map(e => ({
            name: new Date(e.y, e.m).toLocaleDateString("en-US", { month: "long", year: 'numeric' }),
            records: this.getRecordsByMonth(e.m, e.y)
        }))
    }
    private getHMonths(): { m: number, y: number }[] {
        return [...new Set(
            this.records.map(e => JSON.stringify({ m: e.date.hmonth_number, y: e.date.hyear_number }))
        )].map(e => JSON.parse(e))
    }
    private getRecordsByHMonth(month: number, year: number) {
        return this.records.filter(e => e.date.hmonth_number === month && e.date.hyear_number === year)
    }
    private groupByHMonth(): { name: string, records: Record[] }[] {
        return this.getHMonths().map(e => ({
            name: new HDate(1, e.m, e.y).renderGematriya(true).split(' ').slice(1).join(' '),
            records: this.getRecordsByHMonth(e.m, e.y)
        }))
    }
    private isLastDayOfMonth(date: Date): boolean {
        return date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }
    private isLastDayOfHMonth(date: HDate): boolean {
        return date.getDate() === date.daysInMonth()
    }
    private generateRecords(records: AttendanceRecord[], registration_date: string | null): Record[] {
        records.forEach(e => e.date = new Date(e.date.slice(0, -1)).toDateString())
        const end_date = new Date()
        end_date.setHours(end_date.getHours() - 4, 0, 0, 0)
        const start_date = new Date(registration_date?.slice(0, -1) || end_date)
        const result: Record[] = []
        for (let is_first = true, week = 0, hweek = 0; end_date.getTime() >= start_date.getTime(); end_date.setDate(end_date.getDate() - 1), is_first = false) {
            const hdate = new HDate(end_date)
            if (end_date.getDay() === 6 && !is_first) week++, hweek++
            if (this.isLastDayOfMonth(end_date)) week = 0
            if (this.isLastDayOfHMonth(hdate)) hweek = 0
            const record = records.find(e => e.date === end_date.toDateString())
            result.push({
                date: {
                    date: end_date.toDateString(),
                    day_number: end_date.getDay(),
                    date_number: end_date.getDate(),
                    month_number: end_date.getMonth(),
                    year_number: end_date.getFullYear(),
                    week_number: week,
                    hdate_string: hdate.renderGematriya(true).split(' ')[0].replace(/[^א-ת]/g, ''),
                    hmonth_number: hdate.getMonth(),
                    hyear_number: hdate.getFullYear(),
                    hweek_number: hweek
                },
                arrived: record?.arrived || null,
                time_in: record?.time_in || null,
                time_out: record?.time_out || null,
                text: record?.text || null
            })
        }
        return result
    }
}