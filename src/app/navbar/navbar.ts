import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [TranslateModule, RouterLink,RouterLinkActive, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private translate: TranslateService) {}

  currentLang: string = localStorage.getItem('appLang') || 'en';
 changeLanguage(lang: string): void {
    this.translate.use(lang)    ;
    localStorage.setItem('appLang', lang);
  }


  navItems = [
    { label: 'navitem.home', link: '/', icon:'fa-solid fa-house' },
    { label: 'navitem.cart', link: '/cart', icon:'fa-solid fa-cart-shopping' },
    { label: 'navitem.orders', link: '/orders', icon:'fa-solid fa-list' },
    { label: 'navitem.setting', link: '/setting', icon:'fa-solid fa-gear' },
    { label: 'navitem.login', link: '/login', icon:'fa-solid fa-right-from-bracket' },
  ];
 

}
