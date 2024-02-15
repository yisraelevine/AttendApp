import { HDate } from "@hebcal/core";
import { AttendanceRecord } from "./interfaces";

interface Record {
    date: string
    day: number
    c: {
        date: string
        month: number
        year: number
        week: number
    }
    j: {
        date: string
        month: number
        year: number
        week: number
    }
    arrived: boolean | null
    time_in: string | null
    time_out: string | null
    text: string | null
}

interface Record2 {
    date: string
    day: number
    ch: {
        date: string
        month: number
        year: number
        week: number
    }
    arrived: boolean | null
    time_in: string | null
    time_out: string | null
    text: string | null
}

export class PastRecords {
    public daysOfWeek: string[][] = [
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
    ]
    public records: AttendanceRecord[]
    public crecords: Record[]
    public recordsByMonth: { name: string, records: Record2[] }[]
    public recordsByHMonth: { name: string, records: Record2[] }[]
    constructor(records: AttendanceRecord[], registration_date: string | null) {
        this.records = records
        this.crecords = this.generateRecords(records, registration_date)
        this.recordsByMonth = this.groupByMonth().map(e => ({
            ...e, records: e.records.map(r => ({ ...r, ch: r.c }))
        }))
        this.recordsByHMonth = this.groupByHMonth().map(e => ({
            ...e, records: e.records.map(r => ({ ...r, ch: r.j }))
        }))
    }
    private getMonths(): { m: number, y: number }[] {
        return [...new Set(
            this.crecords.map(e => JSON.stringify({ m: e.c.month, y: e.c.year }))
        )].map(e => JSON.parse(e))
    }
    private getRecordsByMonth(month: number, year: number) {
        return this.crecords.filter(e => e.c.month === month && e.c.year === year)
    }
    private groupByMonth(): { name: string, records: Record[] }[] {
        return this.getMonths().map(e => ({
            name: new Date(e.y, e.m).toLocaleDateString("en-US", { month: "long", year: 'numeric' }),
            records: this.getRecordsByMonth(e.m, e.y)
        }))
    }
    private getHMonths(): { m: number, y: number }[] {
        return [...new Set(
            this.crecords.map(e => JSON.stringify({ m: e.j.month, y: e.j.year }))
        )].map(e => JSON.parse(e))
    }
    private getRecordsByHMonth(month: number, year: number) {
        return this.crecords.filter(e => e.j.month === month && e.j.year === year)
    }
    private groupByHMonth(): { name: string, records: Record[] }[] {
        return this.getHMonths().map(e => ({
            name: new HDate(1, e.m, e.y).renderGematriya(true).split(' ').slice(1).join(' '),
            records: this.getRecordsByHMonth(e.m, e.y)
        }))
    }
    private generateRecords(records: AttendanceRecord[], registration_date: string | null): Record[] {
        records.forEach(e => e.date = new Date(e.date.slice(0, -1)).toDateString())
        const end_date = new Date()
        end_date.setHours(end_date.getHours() - 4, 0, 0, 0)
        const date = new Date(registration_date?.slice(0, -1) || end_date)
        const result: Record[] = []
        for (let first = true, week = 0, hweek = 0; date.getTime() <= end_date.getTime(); date.setDate(date.getDate() + 1), first = false) {
            const hdate = new HDate(date)
            if (date.getDay() === 0 && !first) week++, hweek++
            if (date.getDate() === 1) week = 0
            if (hdate.getDate() === 1) hweek = 0
            const record = records.find(e => e.date === date.toDateString())
            result.push({
                date: date.toDateString(),
                day: date.getDay(),
                c: {
                    date: date.getDate().toString(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    week: week
                },
                j: {
                    date: hdate.renderGematriya(true).split(' ')[0].replace(/[^א-ת]/g, ''),
                    month: hdate.getMonth(),
                    year: hdate.getFullYear(),
                    week: hweek
                },
                arrived: record?.arrived || null,
                time_in: record?.time_in || null,
                time_out: record?.time_out || null,
                text: record?.text || null
            })
        }
        return result.reverse()
    }
}