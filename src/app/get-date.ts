import { HDate } from "@hebcal/core"
const hDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
const gDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export class getDate {
	hDate: string
	cDate: string
	date: string
	constructor() {
		const cd = new Date()
		cd.setHours(cd.getHours() - 4)
		let hd = new HDate(cd)
		this.hDate = hDays[cd.getDay()] + ', ' +
			hd.renderGematriya(true).slice(0, -5)
		this.cDate = gDays[cd.getDay()] + ', ' +
			cd.toLocaleDateString(undefined, { month: "short", day: "numeric" })
		this.date = cd.toISOString().split('T')[0]
	}
}