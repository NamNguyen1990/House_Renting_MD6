import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {HousedetailComponent} from "./components/housedetail/housedetail.component";
import {MyhouseListComponent} from "./components/myhouse/myhouse-list/myhouse-list.component";
import {MyhouseCreateComponent} from "./components/myhouse/myhouse-create/myhouse-create.component";



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
  },
  {
    path: 'myhouse', children: [
      {path: 'list', component: MyhouseListComponent},
      {path: 'create', component: MyhouseCreateComponent},

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
