import { AttendanceRecord } from "./interfaces"

// Adds missing dates to an attendance record array for a specified student
// - Converts existing dates to a consistent format
// - Establishes a start date for attendance tracking
// - Adjusts start date if current time is before 4 am
// - Iterates backward, skipping Saturdays, to create records for missing dates
export class AddMissingDates {
    static addMissingDates(data: AttendanceRecord[], student_id: number): AttendanceRecord[] {
        // Convert existing dates to a consistent format
        data.forEach(item => item.date = new Date(item.date.slice(0, -1)).toDateString());

        // Initialize an array to store complete attendance records
        const complete: AttendanceRecord[] = [];

        // Establish the starting date for attendance tracking
        const startDate = new Date('2023-08-31T00:00');

        // Get the current date
        const currentDate = new Date();

        // Lengthen the duration of the day to include hours until 4 am
        if (currentDate.getHours() < 4) currentDate.setDate(currentDate.getDate() - 1);

        // Iterate backward, skipping Saturdays, to create records for missing dates
        for (let date = currentDate; date >= startDate; date.setDate(date.getDate() - 1)) {
            if (date.getDay() === 6) continue;

            // Find existing record for the date or create a new one
            const existing = data.find(item => item.date === date.toDateString());
            complete.push(existing ? existing : {
                date: date.toDateString(),
                student_id: student_id,
                arrived: null,
                time_in: null,
                time_out: null
            });
        }

        return complete;
    }
}
