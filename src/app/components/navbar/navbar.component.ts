import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {}

  statusClicked(): void {
    this.router.navigateByUrl('/status');
  }

  ngOnInit() {
  }

}
