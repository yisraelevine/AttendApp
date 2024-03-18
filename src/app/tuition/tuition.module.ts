import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from '../routing.module'
import { FamiliesComponent } from './families/families.component'
import { PeriodsComponent } from './periods/periods.component'

@NgModule({
	declarations: [
		FamiliesComponent,
		PeriodsComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppRoutingModule
	]
})
export class TuitionModule { }
