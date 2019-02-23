import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { SuppliersComponent } from './pages/suppliers/suppliers.component';
// import { MaterialsComponent } from './pages/materials/materials.component';
// import { OrdersComponent } from './pages/orders/orders.component';
// import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
// import { RegisterComponent } from './account/register/register.component';
// import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // {
  //   path: "dashboard",
  //   component: DashboardComponent,
  //   data: { title: "Dashboard" },
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: "suppliers",
  //   component: SuppliersComponent,
  //   data: { title: "Suppliers" }
  // },
  // {
  //   path: "materials",
  //   component: MaterialsComponent,
  //   data: { title: "Materials" }
  // },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      }
    ]
  },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } }

  // {
  //   path: "register",
  //   component: RegisterComponent,
  //   data: { title: "Register" }
  // },
  // { path: "orders", component: OrdersComponent, data: { title: "Orders" } },
  // { path: "user", component: UserComponent, data: { title: "User" } }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
