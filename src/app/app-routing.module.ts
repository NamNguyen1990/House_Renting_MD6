import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {HousedetailComponent} from "./components/housedetail/housedetail.component";
import {OrderListComponent} from "./components/orders/order-list/order-list.component";
import {OrderDetailComponent} from "./components/orders/order-detail/order-detail.component";
import {MyhouseListComponent} from "./components/myhouse/myhouse-list/myhouse-list.component";
import {UpdateProfileComponent} from "./components/update-profile/update-profile.component";
import {MyhouseCreateComponent} from "./components/myhouse/myhouse-create/myhouse-create.component";
import {OrderCreateComponent} from "./components/orders/order-create/order-create.component";
import {MyhouseDetailComponent} from "./components/myhouse/myhouse-detail/myhouse-detail.component";
import {MyhouseEditComponent} from "./components/myhouse/myhouse-edit/myhouse-edit.component";
import {UpdatePasswordComponent} from "./components/update-password/update-password.component";



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
    path: 'update-password/:id',
    component: UpdatePasswordComponent
  },
  {
    path: 'update-profile/:id',
    component: UpdateProfileComponent
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
    path: 'order/:idHome',
    component: OrderCreateComponent
  },
  {
    path:'orderlist',
    component:OrderListComponent
  },
  {
    path:'show-detail/:id',
    component:OrderDetailComponent
  },{
    path: 'myhouse', children: [
      {path: 'list', component: MyhouseListComponent},
      {path: 'create', component: MyhouseCreateComponent},
      {path: 'list/myhouse-detail/:id', component: MyhouseDetailComponent},
      {path: 'edit/:id', component: MyhouseEditComponent},

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
