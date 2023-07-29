import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TestBootstrapComponent } from './test-bootstrap/test-bootstrap.component';

@NgModule({
  declarations: [
    AppComponent,
    TestBootstrapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
