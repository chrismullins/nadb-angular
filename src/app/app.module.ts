import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { StatusComponent } from './components/status/status.component';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';
import { CollapseModule, TabsModule, ButtonsModule, ModalModule } from 'ngx-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AdminComponent } from './components/admin/admin.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import {ModalService} from './services/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StatusComponent,
    NavbarComponent,
    LogoutComponent,
    AdminComponent,
    AlertComponent
  ],
  imports: [
    CollapseModule, TabsModule.forRoot(), ButtonsModule.forRoot(), ModalModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, canActivate: [LoginRedirect] },
      { path: 'register', component: RegisterComponent, canActivate: [LoginRedirect] },
      { path: 'status', component: StatusComponent, canActivate: [EnsureAuthenticated] },
      { path: 'logout', component: LogoutComponent },
      { path: 'admin', component: AdminComponent, }
    ])
  ],
  providers: [AuthService, EnsureAuthenticated, LoginRedirect, AlertService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
