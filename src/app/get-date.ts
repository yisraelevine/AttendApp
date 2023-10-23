import { HDate } from "@hebcal/core";

export class getDate {
	hdate: string;
	gdate: string;
	jdate: string;
	constructor() {
		let hd = new HDate();
		const gd = new Date();
		if (new Date().getHours() < 4) {
			hd = hd.subtract(1);
			gd.setDate(gd.getDate() - 1);
		}
		this.hdate = hd.renderGematriya(true);
		this.gdate = gd.toLocaleDateString('en-US');
		this.jdate = gd.getFullYear() + '-' +
			(gd.getMonth() + 1).toString().padStart(2, '0') + '-' +
			gd.getDate().toString().padStart(2, '0');
	}
}
