import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  //private BASE_URL: string = 'http://localhost:5000/auth';
  private BASE_URL: string = environment.users_service_url + '/auth';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  //private plainheaders: Headers = new Headers( {'Content-Type': 'text/plain'});
  constructor(private http: Http) {}
  login(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/login`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  register(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  ensureAuthenticated(token): Promise<any> {
    let url: string = `${this.BASE_URL}/status`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  // delete(userid: Number, token: String): Promise<any> {
  //   let url: string = `${this.BASE_URL}/users/${userid}`
  //   //return this.http.delete(url, {headers: this.headers}).toPromise();
  //   let authheaders: Headers = new Headers( {
  //     'Content-Type': '',
  //       Authorization: `Bearer ${token}`
  //   });
  //   return this.http.delete(url, {headers: authheaders}).toPromise();
  // }
}
