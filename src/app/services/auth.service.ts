import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<string | null | undefined>(localStorage.getItem('token') ? localStorage.getItem('token') : undefined);
  public headers = new HttpHeaders({
    'Authorization': `Bearer ${this.currentUserSig()}`
  });
  public BASE_URL = 'https://todo-back-production.up.railway.app';

  constructor(private http: HttpClient) {
  }

  login(telegram_id: number, login: string, password: string): Observable<string> {
    return this.http.post<{ token: string }>(`${this.BASE_URL}/auth/login`, {
      telegram_id, login, password
    }).pipe(
      map(responce => responce.token)
    );
  }

  registration(telegram_id: number, login: string, password: string) {
    return this.http.post<{ token: string }>(`${this.BASE_URL}/auth/registration`, {
      telegram_id, login, password
    }).pipe(
      map(responce => responce.token)
    );
  }

  deleteAccount() {
    return this.http.delete(`${this.BASE_URL}/auth/login`, {headers: this.headers});
  }
}
