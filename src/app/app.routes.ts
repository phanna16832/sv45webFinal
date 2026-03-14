import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { Cart } from './cart/cart';
import { Orders } from './orders/orders';
import { Settings } from './settings/settings';
import { Notfound } from './notfound/notfound';

export const routes: Routes = [
  // 1. PUBLIC ROUTES (No Guard)
  { 
    path: 'login', 
    loadComponent: () => import('./login/login').then((m) => m.Login) 
  },
  { 
    path: 'setting', // Per your request: accessible without login
    component: Settings 
  },

  // 2. PROTECTED ROUTES (Requires Login)
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home').then((m) => m.Home),
        pathMatch: 'full',
      },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'cart',
        component: Cart,
      },
      {
        path: 'orders',
        component: Orders,
      },
    ]
  },

  // 3. WILDCARD (404)
  {
    path: '**',
    component: Notfound,
  },
];