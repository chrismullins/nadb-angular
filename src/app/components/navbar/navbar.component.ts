import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(private auth: AuthService, private router: Router) {}



  statusClicked(): void {
    this.router.navigateByUrl('/status');
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((user) => {
        //console.log(user.json());
        if (user.json().status === 'success') {
          this.isLoggedIn = true;
          this.isAdmin = user.json().data.admin;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

}
