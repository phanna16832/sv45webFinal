import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, User } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://fakestoreapi.com';

  token = signal<string | null>(localStorage.getItem('token'));
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) {
    if (this.token()) this.loadUser();
  }

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.token.set(res.token);
        this.isLoggedIn.set(true);
        this.loadUser();
      })
    );
  }

  private loadUser() {
    // FakeStore has no /me endpoint, fetch user by username
    this.http.get<User[]>(`${this.baseUrl}/users`).subscribe((users) => {
      const saved = localStorage.getItem('username');
      const user = users.find((u) => u.username === saved) || users[0];
      this.currentUser.set(user);
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.token.set(null);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}