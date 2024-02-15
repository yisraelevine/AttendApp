import { HDate } from "@hebcal/core";
import { AttendanceRecord } from "./interfaces";

interface CalanderDate {
    dateString: string
    month: number
    year: number
    week: number
    day: number
}

interface Record extends AttendanceRecord, CalanderDate { }

export class PastRecords {
    public daysOfWeek: string[][] = [
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
    ]
    private cRecords: Record[]
    private hRecords: Record[]
    public recordsByCMonth: { name: string, records: Record[] }[]
    public recordsByHMonth: { name: string, records: Record[] }[]
    constructor(records: AttendanceRecord[], regDate: string | null) {
        records.forEach(e => e.date = new Date(e.date.slice(0, -1)).toDateString())
        const endDate = new Date()
        endDate.setHours(endDate.getHours() - 4, 0, 0, 0)
        const startDate = new Date(regDate?.slice(0, -1) || endDate)
        this.cRecords = this.generateCRecords(records, startDate, endDate)
        this.hRecords = this.generateHRecords(records, startDate, endDate)
        this.recordsByCMonth = this.groupByCMonth()
        this.recordsByHMonth = this.groupByHMonth()
    }
    private getRecordsByMonth(records: Record[], month: number, year: number) {
        return records.filter(e => e.month === month && e.year === year)
    }
    private getMonths(records: Record[]): { m: number, y: number }[] {
        return [...new Set(
            records.map(e => JSON.stringify({ m: e.month, y: e.year }))
        )].map(e => JSON.parse(e))
    }
    private groupByCMonth(): { name: string, records: Record[] }[] {
        return this.getMonths(this.cRecords).map(e => ({
            name: new Date(e.y, e.m).toLocaleDateString("en-US", { month: "long", year: 'numeric' }),
            records: this.getRecordsByMonth(this.cRecords, e.m, e.y)
        }))
    }
    private groupByHMonth(): { name: string, records: Record[] }[] {
        return this.getMonths(this.hRecords).map(e => ({
            name: new HDate(1, e.m, e.y).renderGematriya(true).split(' ').slice(1).join(' '),
            records: this.getRecordsByMonth(this.hRecords, e.m, e.y)
        }))
    }
    private generateCRecords(records: AttendanceRecord[], startDate: Date, endDate: Date): Record[] {
        const result: Record[] = []
        for (let first = true, week = 0, date = new Date(startDate); date.getTime() <= endDate.getTime(); first = false, date.setDate(date.getDate() + 1)) {
            const cDate = new Date(date)
            if (date.getDay() === 0 && !first) week++
            if (cDate.getDate() === 1) week = 0
            const record = records.find(e => e.date === date.toDateString())
            result.push({
                dateString: date.toDateString(),
                date: cDate.getDate().toString(),
                month: cDate.getMonth(),
                year: cDate.getFullYear(),
                week: week,
                day: date.getDay(),
                arrived: record?.arrived || null,
                timeIn: record?.timeIn || null,
                timeOut: record?.timeOut || null,
                text: record?.text || null
            })
        }
        return result.reverse()
    }
    private generateHRecords(records: AttendanceRecord[], startDate: Date, endDate: Date): Record[] {
        const result: Record[] = []
        for (let first = true, week = 0, date = new Date(startDate); date.getTime() <= endDate.getTime(); first = false, date.setDate(date.getDate() + 1)) {
            const hDate = new HDate(date)
            if (date.getDay() === 0 && !first) week++
            if (hDate.getDate() === 1) week = 0
            const record = records.find(e => e.date === date.toDateString())
            result.push({
                dateString: date.toDateString(),
                date: hDate.renderGematriya(true).split(' ')[0].replace(/[^א-ת]/g, ''),
                month: hDate.getMonth(),
                year: hDate.getFullYear(),
                week: week,
                day: date.getDay(),
                arrived: record?.arrived || null,
                timeIn: record?.timeIn || null,
                timeOut: record?.timeOut || null,
                text: record?.text || null
            })
        }
        return result.reverse()
    }
}