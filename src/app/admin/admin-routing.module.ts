import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsListComponent } from './events-list/events-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { TemplateComponent } from './templates/template/template.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: "dash",
    component: TemplateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "events",
        component: EventsListComponent
      },
      {
        path: "detail/:id",
        component: EventDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
