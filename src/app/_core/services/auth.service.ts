import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly serverUrl = 'https://reqres.in/api';

  constructor(private httpClient: HttpClient) { }

  login(body): Observable<any>
  {
    return this.httpClient.post(this.serverUrl + "/login", body)    //le trimitem username si parola si primim un token in caz OK -SAU eroare
  }
  register(body): Observable<any> 
    {
      return this.httpClient.post(this.serverUrl + "/register",body);
    }
}
