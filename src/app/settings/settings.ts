import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SettingService, FontSize, Theme, Language } from '../services/setting-services/setting-service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Login } from '../login/login';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, TranslateModule],
  templateUrl: './settings.html',
})
export class Settings {
  settingService = inject(SettingService);
  

  changeFontSize(size: FontSize): void {
    this.settingService.setFontSize(size);
  }

  changeTheme(theme: Theme): void {
    this.settingService.setTheme(theme);
  }

  changeLanguage(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as Language;
    this.settingService.setLanguage(value);
  }

  // Quick select dropdown handler
  onQuickSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as FontSize;
    if (value) {
      this.settingService.setFontSize(value);
    }
  }


     constructor(
    public auth: AuthService,
    private router: Router
  ) {}

   goToLogin() {
    this.router.navigateByUrl('login');
  }

  logout() {
    this.auth.logout();
  }


}