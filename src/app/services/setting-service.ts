import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  isDarkMode: boolean = localStorage.getItem('darkMode') === 'true';
  currentFontSize: number = 14; // Track current size
  smallSize: number = 12;
  mediumSize: number = 14;
  largeSize: number = 16;
  extraSize : number = 18;

   constructor() {
    // Apply on startup
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

toggleDarkMode(): void {
  this.isDarkMode = !this.isDarkMode;

  document.documentElement.classList.toggle('dark', this.isDarkMode);

  localStorage.setItem('darkMode', this.isDarkMode.toString());
}

  setFontSize(size: number): void {
    this.currentFontSize = size;
    document.documentElement.style.fontSize = `${size}px`;
  }

  getFontSize(): number {
    return this.currentFontSize;
  }
}