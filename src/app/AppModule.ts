import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './AppComponent';
import { WebRequestJsonService } from '../services/WebRequestJsonService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: WebRequestJsonService, useClass: WebRequestJsonService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
