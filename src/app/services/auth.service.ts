import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { TokenAPIResponce } from '../models/api-responces';

type TokenType = string | null | undefined

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSig = signal<TokenType>(localStorage.getItem('token') ? localStorage.getItem('token') : undefined);
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.currentUserSig()}`
  });
  private BASE_URL = 'https://todo-back-production.up.railway.app/auth';

  constructor(private http: HttpClient) {
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserSig();
  }

  public get token() {
    return this.currentUserSig();
  }

  public login(telegram_id: number, login: string, password: string): Observable<string> {
    return this.http.post<TokenAPIResponce>(`${this.BASE_URL}/login`, {
      telegram_id, login, password
    }).pipe(
      map(responce => responce.token),
      tap(responce => this.setUser(responce))
    );
  }

  public registration(telegram_id: number, login: string, password: string) {
    return this.http.post<TokenAPIResponce>(`${this.BASE_URL}/registration`, {
      telegram_id, login, password
    }).pipe(
      map(responce => responce.token),
      tap(responce => this.setUser(responce))
    );
  }

  public deleteAccount() {
    return this.http.delete(`${this.BASE_URL}/login`, {headers: this.headers});
  }

  public setUser(token: TokenType) {
    localStorage.setItem('token', token ? token : '');
    this.currentUserSig.set(token);
  }

}
