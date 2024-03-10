import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ClassesComponent } from './classes/classes.component'
import { HttpClientModule } from '@angular/common/http'
import { StudentsListComponent } from './students/students.component'
import { PastComponent } from './past/past.component'
import { AppRoutingModule } from '../routing.module'

@NgModule({
	declarations: [
		ClassesComponent,
		StudentsListComponent,
		PastComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppRoutingModule
	]
})
export class AttendModule { }
