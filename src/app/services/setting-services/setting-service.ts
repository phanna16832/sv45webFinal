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
  private readonly storageKey = 'defaultSetting';

  // State Signals
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
      
      // Update Signals
      this.fontSize.set(settings.fontSize);
      this.theme.set(settings.theme);
      this.language.set(settings.language);

      // Apply initial styles
      this.applyTheme(settings.theme);
      this.applyFontSize(settings.fontSize);
      this.applyFontFamily(settings.language);
      this.translate.use(settings.language);
    } else {
      // Default fallback for new users
      this.applyTheme('light');
      this.applyFontSize('medium');
      this.applyFontFamily('en');
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

  private applyFontFamily(lang: Language): void {
    const html = document.documentElement;
    // Removing these standard Tailwind classes
    html.classList.remove('font-en', 'font-km', 'font-cn');

    const fontMap: Record<Language, string> = {
      en: 'font-en',
      km: 'font-km',
      cn: 'font-cn',
    };
    html.classList.add(fontMap[lang]);
  }

  // Setters - Always call these from your components
  setLanguage(lang: Language): void {
    this.language.set(lang);
    this.translate.use(lang);
    this.applyFontFamily(lang);
    this.saveSettings(); // Persists to LocalStorage
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.applyTheme(theme);
    this.saveSettings(); // Persists to LocalStorage
  }

  setFontSize(size: FontSize): void {
    this.fontSize.set(size);
    this.applyFontSize(size);
    this.saveSettings(); // Persists to LocalStorage
  }
}