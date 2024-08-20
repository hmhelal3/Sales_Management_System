import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiBaseUrl: 'http:/localhost:8080';

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){} 

 
  public saveUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/user/add`, user);
  }

  
  public login(user: any): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/user/login`, user);
    // return this.http.get<any>(`${this.apiServerUrl}/user/login`, user);
  }

  doLogin(username:string,password:string){
      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.http.get("http://localhost:8080/",{headers,responseType: 'text' as 'json'})
    }

      

}
