import { HDate } from "@hebcal/core"
const hDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
const gDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export class getDate {
	hDate: string
	cDate: string
	date: string
	constructor() {
		const d = new Date()
		d.setHours(d.getHours() - 4)
		let hd = new HDate(d)
		this.hDate = hDays[d.getDay()] + ', ' +
			hd.renderGematriya(true).slice(0, -5)
		this.cDate = gDays[d.getDay()] + ', ' +
			d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
		this.date = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-')
	}
}