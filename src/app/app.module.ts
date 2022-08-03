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
import { OrderCreateComponent } from './components/orders/order-create/order-create.component';
import {OrderListComponent} from "./components/orders/order-list/order-list.component";
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "@abacritt/angularx-social-login";
import { OrderDeleteComponent } from './components/orders/order-delete/order-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    HousedetailComponent,
    NavbarComponent,
    OrderCreateComponent,
    NavbarComponent,
    OrderListComponent,
    OrderDetailComponent,
    MyhouseListComponent,
    MyhouseCreateComponent,
    MyhouseEditComponent,
    NavbarComponent,
    OrderDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    SocialLoginModule,

    NgToastModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '600600839708-k9l98tk4a2n1hlko1qdgejotbkt1brm4.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
