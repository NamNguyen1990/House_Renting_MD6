import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgToastModule} from "ng-angular-popup";
import { SignupComponent } from './components/signup/signup.component';
import {HomepageComponent} from "./components/homepage/homepage.component";
import { HousedetailComponent } from './components/housedetail/housedetail.component';
import {NavbarComponent} from "./components/blocks/navbar/navbar.component";
import { MyhouseListComponent } from './components/myhouse/myhouse-list/myhouse-list.component';
import { MyhouseCreateComponent } from './components/myhouse/myhouse-create/myhouse-create.component';
import { MyhouseEditComponent } from './components/myhouse/myhouse-edit/myhouse-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    HousedetailComponent,
    NavbarComponent,
    MyhouseListComponent,
    MyhouseCreateComponent,
    MyhouseEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
