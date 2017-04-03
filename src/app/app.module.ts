import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// CAPE Components and Services
import { AppComponent } from './app.component';
import { GetXmlService } from './get-xml.service';

// 3rd Party
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule
  ],
  providers: [
    GetXmlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
