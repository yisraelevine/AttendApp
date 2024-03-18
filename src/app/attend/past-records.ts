import { HDate } from "@hebcal/core"
import { PastRecord } from "./interfaces"

interface Record extends PastRecord {
    dateString: string
    month: number
    year: number
    week: number
    day: number
}

export class PastRecords {
    public daysOfWeek: string[][] = [
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
    ]
    private cRecords: Record[]
    private hRecords: Record[]
    public recordsByCMonth: { name: string, records: Record[] }[]
    public recordsByHMonth: { name: string, records: Record[] }[]
    private startDate: Date
    private endDate: Date
    constructor(records: PastRecord[], regDate?: string) {
        this.endDate = new Date()
        this.endDate.setHours(this.endDate.getHours() - 4, 0, 0, 0)
        this.startDate = new Date(regDate?.split('T')[0] || this.endDate)
        records.forEach(e => e.date = new Date(e.date.slice(0, -1)).toDateString())
        this.cRecords = this.generateCRecords(records, this.startDate, this.endDate)
        this.hRecords = this.generateHRecords(records, this.startDate, this.endDate)
        this.recordsByCMonth = this.groupByMonth(this.cRecords, this.cNameBuilder)
        this.recordsByHMonth = this.groupByMonth(this.hRecords, this.hNameBuilder)
    }
    private getRecordsByMonth(records: Record[], month: number, year: number): Record[] {
        return records.filter(e => e.month === month && e.year === year)
    }
    private getMonths(records: Record[]): { month: number, year: number }[] {
        return [...new Set(
            records.map(e => JSON.stringify({ month: e.month, year: e.year }))
        )].map(e => JSON.parse(e))
    }
    private groupByMonth(records: Record[], nameBuilder: (month: number, year: number) => string): { name: string, records: Record[] }[] {
        return this.getMonths(records).map(e => ({
            name: nameBuilder(e.month, e.year),
            records: this.getRecordsByMonth(records, e.month, e.year)
        }))
    }
    private cNameBuilder(month: number, year: number): string {
        return new Date(year, month).toLocaleDateString("en-US", { month: "long", year: 'numeric' })
    }
    private hNameBuilder(month: number, year: number): string {
        return new HDate(1, month, year).renderGematriya(true).split(' ').slice(1).join(' ')
    }
    getDateRecord(records: PastRecord[], date: Date): Omit<PastRecord, 'date'> {
        const record = records.find(e => e.date === date.toDateString())
        if (!record) return { arrived: null, timeIn: null, timeOut: null, text: null }
        const { date: targetDate, ...result } = record
        return result
    }
    dateIsInRange(date: Date | HDate, endDate: Date | HDate): boolean {
        const year = date.getFullYear(), endYear = endDate.getFullYear(),
            { month, endMonth } = (date instanceof Date || endDate instanceof Date) ?
                { month: date.getMonth(), endMonth: endDate.getMonth() } :
                { month: date.getTishreiMonth(), endMonth: endDate.getTishreiMonth() }
        return year < endYear || (year === endYear && month <= endMonth)
    }
    private generateCRecords(records: PastRecord[], startDate: Date, endDate: Date): Record[] {
        if (startDate.getTime() === endDate.getTime()) return []
        const result: Record[] = []
        let week = 0, date = new Date(startDate.getFullYear(), startDate.getMonth())
        while (this.dateIsInRange(date, endDate)) {
            result.push({
                dateString: date.toDateString(),
                date: date.getDate().toString(),
                month: date.getMonth(),
                year: date.getFullYear(),
                week: week = (date.getDate() === 1) ? 0 : (date.getDay() === 0) ? (week + 1) : week,
                day: date.getDay(),
                ...this.getDateRecord(records, date)
            })
            date.setDate(date.getDate() + 1)
        }
        return result.reverse()
    }
    private generateHRecords(records: PastRecord[], startDate: Date, endDate: Date): Record[] {
        if (startDate.getTime() === endDate.getTime()) return []
        const result: Record[] = []
        const startHDate = new HDate(startDate)
        const endHDate = new HDate(endDate)
        let week = 0, date = new HDate(1, startHDate.getMonth(), startHDate.getFullYear())
        while (this.dateIsInRange(date, endHDate)) {
            result.push({
                dateString: date.greg().toDateString(),
                date: date.renderGematriya(true).split(' ')[0].replace(/[^א-ת]/g, ''),
                month: date.getMonth(),
                year: date.getFullYear(),
                week: week = (date.getDate() === 1) ? 0 : (date.getDay() === 0) ? (week + 1) : week,
                day: date.getDay(),
                ...this.getDateRecord(records, date.greg())
            })
            date = date.add(1)
        }
        return result.reverse()
    }
    public isExtraDay(date: string) {
        const time = new Date(date).getTime()
        return time > this.endDate.getTime() || time < this.startDate.getTime()
    }
}