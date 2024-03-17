import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './header/header.component'
import { AppComponent } from './app.component'
import { AttendModule } from './attend/attend.module'
import { AppRoutingModule } from './routing.module'
import { TuitionModule } from './tuition/tuition.module'

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent
	],
	imports: [
		AttendModule,
		TuitionModule,
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
