import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private BASE_URL: string = environment.users_service_url;
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private users: Array<any>;
  //private users: object = {};
  constructor(private http: Http) { }

  getUsers(): Promise<any> {
  	let url: string = `${this.BASE_URL}/users`;
  	return this.http.get(url, {headers: this.headers}).toPromise();
  	//return this.http.get(url, {headers: this.headers})
  }

  ngOnInit() {
  	//console.log(this.getUsers().then);
  	//console.log(users);
  	this.getUsers().then( (res) => {
  		console.log(res.json());
  		this.users = res.json().data.users;
  	})
  }


}
