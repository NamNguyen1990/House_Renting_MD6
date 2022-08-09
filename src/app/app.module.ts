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
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import {environment} from "../environments/environment";
import {OrderListComponent} from "./components/orders/order-list/order-list.component";
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "@abacritt/angularx-social-login";
import { MyhouseDetailComponent } from './components/myhouse/myhouse-detail/myhouse-detail.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NgxPaginationModule} from "ngx-pagination";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import {FotterComponent} from "./components/blocks/fotter/fotter.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import { CommentCreateComponent } from './components/comment/comment-create/comment-create.component';

import { FindTopComponent } from './components/find-top/find-top.component';

import { CommentListComponent } from './components/comment/comment-list/comment-list.component';
import { OrderByIdHouseComponent } from './components/orders/order-by-id-house/order-by-id-house.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxStarRatingModule} from "ngx-star-rating";
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomepageComponent,
        HousedetailComponent,
        NavbarComponent,
        OrderCreateComponent,
        OrderListComponent,
        OrderDetailComponent,
        MyhouseListComponent,
        MyhouseCreateComponent,
        MyhouseEditComponent,
        UpdateProfileComponent,
        FotterComponent,
      MyhouseDetailComponent,
      UpdatePasswordComponent,
      CommentListComponent,
      CommentCreateComponent,
      FindTopComponent,
      CommentListComponent,
      OrderByIdHouseComponent,
    ],
  imports: [
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    SocialLoginModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgxStarRatingModule
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
