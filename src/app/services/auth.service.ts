import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ITokenAPIResponce } from '../models/api-responces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<string | null | undefined>(localStorage.getItem('token') ? localStorage.getItem('token') : undefined);
  public headers = new HttpHeaders({
    'Authorization': `Bearer ${this.currentUserSig()}`
  });
  public BASE_URL = 'https://todo-back-production.up.railway.app/auth';

  constructor(private http: HttpClient) {
  }

  login(telegram_id: number, login: string, password: string): Observable<string> {
    return this.http.post<ITokenAPIResponce>(`${this.BASE_URL}/login`, {
      telegram_id, login, password
    }).pipe(
      map(responce => responce.token)
    );
  }

  registration(telegram_id: number, login: string, password: string) {
    return this.http.post<ITokenAPIResponce>(`${this.BASE_URL}/registration`, {
      telegram_id, login, password
    }).pipe(
      map(responce => responce.token)
    );
  }

  deleteAccount() {
    return this.http.delete(`${this.BASE_URL}/login`, {headers: this.headers});
  }
}
