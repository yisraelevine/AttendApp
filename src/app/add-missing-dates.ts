import { AttendanceRecord } from "./interfaces"

// Adds missing dates to an attendance record array for a specified student
// - Converts existing dates to a consistent format
// - Establishes a start date for attendance tracking
// - Adjusts start date to extend 4 hours after midnight
// - Iterates backward, skipping Saturdays, to create records for missing dates
export function addMissingDates(registration_date: string | null, data: AttendanceRecord[]): AttendanceRecord[] {
    data.forEach(item => item.date = new Date(item.date.slice(0, -1)).toDateString())
    const complete: AttendanceRecord[] = []
    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() - currentDate.getTimezoneOffset() / 60,0,0,0)
    const startDate = new Date(registration_date?.slice(0, -1) || currentDate)
    for (let date = currentDate; date.getTime() >= startDate.getTime(); date.setDate(date.getDate() - 1)) {
        if (date.getDay() === 6) continue
        complete.push(
            data.find(item => item.date === date.toDateString()) ??
            {
                date: date.toDateString(),
                arrived: null,
                time_in: null,
                time_out: null
            }
        )
    }
    return complete
}
