import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
//import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  constructor(private router: Router, private auth: AuthService, private alertService: AlertService) {}
  onLogin(): void {
    this.auth.login(this.user)
    .then((user) => {
      localStorage.setItem('token', user.json().auth_token);
      this.router.navigateByUrl('/status');
      this.alertService.success('You have logged in!');
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
