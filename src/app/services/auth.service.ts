import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://chatbot-backend.mr-narendra.live'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, { email, password });
  }
  
  register(fullName: string, email: string, password: string,optionalFields?: { [key: string]: any }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, { full_name: fullName, email, password, ...optionalFields });
  }
  

  chathome(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat-home/`, { email });
  }

  createNewChat(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat_initiate/`, { email });
  }

  getChatMessages(roomSlug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/chat/${roomSlug}/`);
  }

  sendMessage(roomSlug: string, message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send_message/`, { room_slug: roomSlug, message });
  }

  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('userToken'); 
  }
} 
