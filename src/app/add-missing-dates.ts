import { datesListInterface } from "./interfaces";

export class AddMissingDates {
	private data: datesListInterface[];
	private student_id: number

	constructor(data: datesListInterface[], student_id: number) {
		this.data = data;
		this.student_id = student_id;
	}

	public addMissingDates(): datesListInterface[] {
		const complete: datesListInterface[] = [];


		const startDate = new Date();
		if (startDate.getHours() < 4) {
			startDate.setDate(startDate.getDate() - 1);
		}
		startDate.setHours(-4, 0, 0, 0);
		const endDate = new Date('2023-08-31');
		for (let date = startDate; date >= endDate; date.setDate(date.getDate() - 1)) {
			if (date.getDay() < 5) {
				const existing = this.data.find(item => new Date(item.date).toDateString() === new Date(date).toDateString());

				if (existing) complete.push(existing);
				else {
					complete.push({
						date: date.toISOString(),
						student_id: this.student_id,
						arrived: null,
						time_in: null,
						time_out: null,
					});
				}
			}
		}
		console.log(complete);
		return complete;
	}
}
