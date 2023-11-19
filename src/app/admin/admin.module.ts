import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './templates/template/template.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    EventDetailComponent,
    EventsListComponent,
    LoginComponent,
    TemplateComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
