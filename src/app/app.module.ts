import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './header/header.component'
import { AppComponent } from './app.component'
import { AttendModule } from './attend/attend.module'
import { AppRoutingModule } from './routing.module'

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent
	],
	imports: [
		AttendModule,
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
