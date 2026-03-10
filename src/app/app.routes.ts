import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Orders } from './orders/orders';
import { Notfound } from './notfound/notfound';
import { Login } from './login/login';
import { Settings } from './settings/settings';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
  path: '',
  canActivate: [authGuard],
  loadComponent: () => import('./home/home').then(m => m.Home),
  pathMatch: 'full'
},
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'cart',
        component: Cart
    },
    {
        path: 'orders',
        component: Orders
    },
    {path: 'orders/:pageId',
        component: Orders
    },
    {
        path:'setting', 
        component: Settings
    },
   
       { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./home/home').then(m => m.Home) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '**', // Wildcard route for 404 handling
        component: Notfound
    },
   
    {
        path: '**/pageName',
        component: Notfound
    }
];