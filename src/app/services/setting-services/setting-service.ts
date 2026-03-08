import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'km' | 'cn';
export type FontSize = 'small' | 'medium' | 'large';

interface SettingsStorage {
  fontSize: FontSize;
  theme: Theme;
  language: Language;
}

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private storageKey = 'defaultSetting';

  fontSize = signal<FontSize>('medium');
  theme = signal<Theme>('light');
  language = signal<Language>('en');

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'km', 'cn']);
    this.translate.setDefaultLang('en');
    this.loadSettings();
  }

  private loadSettings(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const settings: SettingsStorage = JSON.parse(data);
      this.fontSize.set(settings.fontSize);
      this.theme.set(settings.theme);
      this.language.set(settings.language);
      this.applyTheme(settings.theme);
      this.applyFontSize(settings.fontSize);
      this.translate.use(settings.language);
    } else {
      this.translate.use('en');
    }
  }

  private saveSettings(): void {
    const settings: SettingsStorage = {
      fontSize: this.fontSize(),
      theme: this.theme(),
      language: this.language(),
    };
    localStorage.setItem(this.storageKey, JSON.stringify(settings));
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  private applyFontSize(size: FontSize): void {
    const html = document.documentElement;
    html.classList.remove('text-sm', 'text-base', 'text-lg');
    const sizeMap: Record<FontSize, string> = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };
    html.classList.add(sizeMap[size]);
  }

  getFontSizeClass(): string {
    const map: Record<FontSize, string> = {
      small: 'text-base',
      medium: 'text-lg',
      large: 'text-xl',
    };
    return map[this.fontSize()];
  }

  setFontSize(size: FontSize): void {
    this.fontSize.set(size);
    this.applyFontSize(size);
    this.saveSettings();
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.applyTheme(theme);
    this.saveSettings();
  }

  setLanguage(lang: Language): void {
    this.language.set(lang);
    this.translate.use(lang); // this triggers all translate pipes automatically!
    this.saveSettings();
  }
}