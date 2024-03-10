import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { getDate } from '../get-date'

@Injectable({
	providedIn: 'root'
})
export class AttendService {
	constructor(private http: HttpClient) { }
	upsertStudent(date: string | null, studentId: number, arrived: boolean | null,
		timeIn: string | null, timeOut: string | null, text: string | null) {
		this.http.put<any>(
			'/api/attend/upsert-student',
			{ date: date ? new Date(date) : new getDate().date, studentId, arrived, timeIn, timeOut, text }
		).subscribe()
	}
}
