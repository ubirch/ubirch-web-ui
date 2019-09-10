import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.serverUrl + environment.apiPrefix;
  usersUrl = this.url + 'users';  // URL to web api to access a user by its token

  constructor(
      private http: HttpClient
  ) {}

  public getUser(): Observable<User> {
    const url = `${this.usersUrl}`;
    return this.http.get<User>(url).pipe(
        map(jsonUser => new User(jsonUser)));
  }
}
