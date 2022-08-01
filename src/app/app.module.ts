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
import { NavbarComponent } from './components/blocks/navbar/navbar.component';
import { FotterComponent } from './components/blocks/fotter/fotter.component';
import {CategoryListComponent} from "./components/category/category-list/category-list.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    NavbarComponent,
    FotterComponent,
    SignupComponent,
    CategoryListComponent
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
