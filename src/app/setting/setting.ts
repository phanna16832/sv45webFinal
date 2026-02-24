import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SettingService } from '../services/setting-service';

@Component({
  selector: 'app-setting',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting implements OnInit {
  fontSize: number = 14;
  currentLang: string = localStorage.getItem('appLang') || 'en';

  constructor(
    private translate: TranslateService,
    public settingService: SettingService
  ) {}

  ngOnInit(): void {
    // Initialize from service
    this.fontSize = this.settingService.getFontSize();
    
    if (this.settingService.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  // Single method to handle font size changes from select
  changeFontSize(size: number | string): void {
    const newSize = Number(size);
    this.settingService.setFontSize(newSize);
    this.fontSize = newSize;
  }

  // Keep these if you want button options too
  setSmallFont(): void {
    this.changeFontSize(this.settingService.smallSize);
  }

  setMediumFont(): void {
    this.changeFontSize(this.settingService.mediumSize);
  }

  setLargeFont(): void {
    this.changeFontSize(this.settingService.largeSize);
  }

  toggleDarkMode(): void {
    this.settingService.toggleDarkMode();
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('appLang', lang);
    this.currentLang = lang;
  }
}