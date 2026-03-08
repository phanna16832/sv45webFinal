import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Orders } from './orders/orders';
import { Notfound } from './notfound/notfound';
import { Login } from './login/login';
import { Settings } from './settings/settings';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        pathMatch: 'full' // Added to prevent partial matching issues
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
   
     {
        path: 'login',
        component: Login
    },
    {
        path: '**', // Wildcard route for 404 handling
        component: Notfound
    },
   
    {
        path: '**/pageName',
        component: Notfound
    }
];