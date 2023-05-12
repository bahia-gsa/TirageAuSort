import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(userData: {name: string, email: string, password: string}){
    return this.http.post<any>('http://localhost:8000/api/register', userData)
  }

  loginUser(userCredentials: {email: string, password: string}){
    return this.http.post<any>('http://localhost:8000/api/login', userCredentials)

  }

  logoutUser(headers: any){
    return this.http.post<any>('http://localhost:8000/api/logout', {}, { headers })

  }



}
