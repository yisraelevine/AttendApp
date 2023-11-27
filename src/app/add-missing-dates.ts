import { AttendanceRecord } from "./interfaces"

// Adds missing dates to an attendance record array for a specified student
// - Converts existing dates to a consistent format
// - Establishes a start date for attendance tracking
// - Adjusts start date if current time is before 4 am
// - Iterates backward, skipping Saturdays, to create records for missing dates
export function addMissingDates(data: AttendanceRecord[], student_id: number): AttendanceRecord[] {
    data.forEach(item => item.date = new Date(item.date.slice(0, -1)).toDateString())
    const complete: AttendanceRecord[] = []
    const startDate = new Date('2023-08-31T00:00')
    const currentDate = new Date()
    if (currentDate.getHours() < 4) currentDate.setDate(currentDate.getDate() - 1)
    for (let date = currentDate; date >= startDate; date.setDate(date.getDate() - 1)) {
        if (date.getDay() === 6) continue
        complete.push(
            data.find(item => item.date === date.toDateString()) ??
            {
                date: date.toDateString(),
                student_id,
                arrived: null,
                time_in: null,
                time_out: null
            }
        )
    }
    return complete
}
