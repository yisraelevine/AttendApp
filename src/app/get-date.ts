import { HDate } from "@hebcal/core";
const hDays = [
	"יום ראשון",
	"יום שני",
	"יום שלישי",
	"יום רביעי",
	"יום חמישי",
	"יום שישי",
	"יום שבת"
];
const gDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
export class getDate {
	hdate: string;
	gdate: string;
	jdate: string;
	constructor() {
		let hd = new HDate();
		const gd = new Date();
		if (gd.getHours() < 4) {
			hd = hd.subtract(1);
			gd.setDate(gd.getDate() - 1);
		}
		this.hdate = hDays[gd.getDay()] + ', ' +
			hd.renderGematriya(true).slice(0, -5);
		this.gdate = gDays[gd.getDay()] + ', ' +
			gd.toLocaleDateString(undefined, { month: "short", day: "numeric" });
		this.jdate = gd.getFullYear() + '-' +
			(gd.getMonth() + 1).toString().padStart(2, '0') + '-' +
			gd.getDate().toString().padStart(2, '0');
	}
}

export const toDate = (date: string): string[] => {
	const gd = new Date(date);
	gd.setDate(gd.getDate() + 1);
	const hd = new HDate(gd);
	return [
		gDays[gd.getDay()] + ', ' + gd.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
		hDays[gd.getDay()] + ', ' + hd.renderGematriya(true).slice(0, -5)
	];
}
