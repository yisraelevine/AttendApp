import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';
import { DatesListComponent } from './dates-list/dates-list.component';

@NgModule({
	declarations: [
		AppComponent,
		ClassesListComponent,
		HeaderComponent,
		StudentsListComponent,
		PermissionsListComponent,
		DatesListComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
