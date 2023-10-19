import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SettingsIconComponent } from './settings-icon/settings-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassesListComponent,
    HeaderComponent,
    SettingsIconComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
