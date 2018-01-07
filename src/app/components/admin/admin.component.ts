import {Component, OnInit, TemplateRef} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import {ModalService} from '../../services/modal.service';
import {noop} from 'rxjs/util/noop';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newUser: User = new User();
  private BASE_URL: string = environment.users_service_url;
  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  private users: Array<any>;
  private deleteUserModal = './deleteUserModal.html';
  constructor(private http: Http, private modal: ModalService, private auth: AuthService, private router: Router) { }

  deleteUserClicked(template: TemplateRef<any>): void {
    this.modal.openModal(template);
  }

  confirmDeleteUser(userid: Number): void {
    // const url = `${this.BASE_URL}/users/${userid}`;
    // return this.http.delete(url, {headers: this.headers}).toPromise();
    this.modal.modalRef.hide();
    this.deleteUserHTTP(userid)
      .then( (res) => {
        console.log('Deleting user....');
        this.reloadUsers();
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  deleteUserHTTP(userid: Number): Promise<any> {
    const url = `${this.BASE_URL}/users/${userid}`;
    return this.http.delete(url, {headers: this.headers}).toPromise();
  }

  settingsUserClicked(template: TemplateRef<any>): void {
    this.modal.openModal(template);
  }

  addNewUserClicked(template: TemplateRef<any>): void {
    this.modal.openModal(template);
  }

  onCreateNewUser(): void {
    this.auth.register(this.newUser)
      .then((user) => {
        console.log(`Created new user!`);
        console.log(this.newUser);
        //this.users.push(this.newUser);
        this.modal.modalRef.hide();
        //this.modal.modalRef.hide();
        this.reloadUsers();
      })
      .catch((err) => {
        console.log(err);
      });
    this.newUser = new User();
  }

  reloadUsers(): void {
    this.getUsers().then( (res) => {
      this.users = res.json().data.users;
    });
  }

  getUsers(): Promise<any> {
    const url = `${this.BASE_URL}/users`;
    return this.http.get(url, {headers: this.headers}).toPromise();
    // return this.http.get(url, {headers: this.headers})
  }

  ngOnInit() {
    // console.log(this.getUsers().then);
    // console.log(users);
    this.getUsers().then( (res) => {
      this.users = res.json().data.users;
    });
  }


}
