import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenUrl;

  constructor(private http: HttpClient) { }

  getTokens(tokenData) {
    // TODO
  }

  postToken() {
    // TODO
  }

  deleteToken(tokenId){
    // TODO
  }
}
