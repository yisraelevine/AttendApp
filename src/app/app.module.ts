import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SettingsIconComponent } from './settings-icon/settings-icon.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { BackIconComponent } from './back-icon/back-icon.component';

@NgModule({
	declarations: [
		AppComponent,
		ClassesListComponent,
		HeaderComponent,
		SettingsIconComponent,
		StudentsListComponent,
		CheckboxComponent,
		BackIconComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
