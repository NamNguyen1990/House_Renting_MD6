import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {HousedetailComponent} from "./components/housedetail/housedetail.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignupComponent

  },
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'view/:id',
    component: HousedetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
