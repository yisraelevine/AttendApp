import { AttendanceRecord } from "./interfaces";

interface Record {
    date: {
        date: string
        date_number: number
        day_number: number
        month_name: string
        month_number: number
        year_number: number
        week_number: number
    }
    arrived: boolean | null
    time_in: string | null
    time_out: string | null
    text: string | null
}

export class PastRecords {
    public records: Record[] = []
    public recordsByMonth: { name: string, records: Record[] }[]
    constructor(records: AttendanceRecord[], registration_date: string | null) {
        this.records = this.generateRecords(records, registration_date)
        this.recordsByMonth = this.groupByMonth()
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
    private isLastDayOfMonth(date: Date): boolean {
        return date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    private generateRecords(records: AttendanceRecord[], registration_date: string | null): Record[] {
        records.forEach(e => e.date = new Date(e.date.slice(0, -1)).toDateString())
        const end_date = new Date()
        end_date.setHours(end_date.getHours() - 4, 0, 0, 0)
        const start_date = new Date(registration_date?.slice(0, -1) || end_date)
        start_date.setDate(start_date.getDate() - start_date.getDay())
        const result: Record[] = []
        for (let is_first = true, week = 0; end_date.getTime() >= start_date.getTime(); end_date.setDate(end_date.getDate() - 1), is_first = false) {
            if (this.isLastDayOfMonth(end_date)) week = 0
            if (end_date.getDay() === 6 && !is_first) week++
            const record = records.find(e => e.date === end_date.toDateString())
            result.push({
                date: {
                    date: end_date.toDateString(),
                    day_number: end_date.getDay(),
                    date_number: end_date.getDate(),
                    month_number: end_date.getMonth(),
                    month_name: end_date.toLocaleString('default', { month: 'long' }),
                    year_number: end_date.getFullYear(),
                    week_number: week
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