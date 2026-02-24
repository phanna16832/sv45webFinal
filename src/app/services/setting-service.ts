import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  isDarkMode: boolean = false;
  currentFontSize: number = 14; // Track current size
  smallSize: number = 12;
  mediumSize: number = 14;
  largeSize: number = 16;

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode; // Toggle instead of always true
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  setFontSize(size: number): void {
    this.currentFontSize = size;
    document.documentElement.style.fontSize = `${size}px`;
  }

  getFontSize(): number {
    return this.currentFontSize;
  }
}