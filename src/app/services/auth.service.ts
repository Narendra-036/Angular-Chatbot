import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://http://127.0.0.1:8000/'; // Replace with your Django API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, { username: email, password });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, { username, email, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken'); 
  }
}
