import { HDate } from "@hebcal/core"
const hDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
const gDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export class getDate {
	hdate: string
	gdate: string
	jdate: string
	constructor() {
		const gd = new Date()
		gd.setHours(gd.getHours() - 4)
		let hd = new HDate(gd)
		this.hdate = hDays[gd.getDay()] + ', ' +
			hd.renderGematriya(true).slice(0, -5)
		this.gdate = gDays[gd.getDay()] + ', ' +
			gd.toLocaleDateString(undefined, { month: "short", day: "numeric" })
		this.jdate = gd.getFullYear() + '-' +
			(gd.getMonth() + 1).toString().padStart(2, '0') + '-' +
			gd.getDate().toString().padStart(2, '0')
	}
	static formatDate = (date: string): string[] => {
		const gd = new Date(date)
		return [
			gDays[gd.getDay()] + ', ' + gd.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
			hDays[gd.getDay()] + ', ' + new HDate(gd).renderGematriya(true).slice(0, -6)
		]
	}
}