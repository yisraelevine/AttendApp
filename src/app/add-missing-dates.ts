import { AttendanceRecord } from "./interfaces";

export class AddMissingDates {
	static addMissingDates(data: AttendanceRecord[], student_id: number): AttendanceRecord[] {
		const complete: AttendanceRecord[] = [];
		const startDate = new Date();
		if (startDate.getHours() < 4) startDate.setDate(startDate.getDate() - 1);
		startDate.setHours(-4, 0, 0, 0);
		const endDate = new Date('2023-08-31');
		for (let date = startDate; date >= endDate; date.setDate(date.getDate() - 1)) {
			if (date.getDay() === 5) continue
			const existing = data.find(item => new Date(item.date).toDateString() === new Date(date).toDateString());
			complete.push(existing ? existing : {
				date: date.toISOString(),
				student_id: student_id,
				arrived: null,
				time_in: null,
				time_out: null
			});
		}
		return complete;
	}
}
