import { AttendanceRecord } from "./interfaces"

/**
 * Adds missing dates to an attendance record array for a specified student
 ** Converts existing dates to a consistent format
 ** Establishes a start date for attendance tracking
 ** Adjusts start date to extend 4 hours after midnight
 ** Iterates backward
 ** when day is Saturday it marks a new week
 ** otherwise it will add record to complete array
 ** the week variable will be added to record
 ** the record's data will be taken from data array, if not found the record's data will have default values
*/

export function addMissingDates(registration_date: string | null, data: AttendanceRecord[]): AttendanceRecord[] {
    data.forEach(item => item.date = new Date(item.date.slice(0, -1)).toDateString())
    const complete: AttendanceRecord[] = []
    const date = new Date()
    date.setHours(date.getHours() - 4, 0, 0, 0)
    const start_date = new Date(registration_date?.slice(0, -1) || date)
    for (let is_first = true, week = 0; date.getTime() >= start_date.getTime(); date.setDate(date.getDate() - 1), is_first = false) {
        if (date.getDay() === 6 && !is_first) week++
        else complete.push({
            week,
            ...(data.find(item => item.date === date.toDateString()) ??
                { date: date.toDateString(), arrived: null, time_in: null, time_out: null, text: null })
        })
    }
    return complete
}
