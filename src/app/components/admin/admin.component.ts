import {Component, OnInit, TemplateRef} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import {ModalService} from '../../services/modal.service';
import {noop} from 'rxjs/util/noop';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private BASE_URL: string = environment.users_service_url;
  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  private users: Array<any>;
  private deleteUserModal: string = './deleteUserModal.html';
  //private users: object = {};
  constructor(private http: Http, private modal: ModalService) { }

  deleteUserClicked(template: TemplateRef<any>): void {
    this.modal.openModal(template);
  }

  confirmDeleteUser(userid: Number): Promise<any> {
    console.log('Deleting user ' + userid);
    const url = `${this.BASE_URL}/users/${userid}`;
    return this.http.delete(url, {headers: this.headers}).toPromise();
  }
  decline(): void {
    //noop();
    this.modal.closeModal();
  }

  settingsUserClicked(): void {
    console.log('Settings clicked.');
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
      console.log(res.json());
      this.users = res.json().data.users;
    });
  }


}
