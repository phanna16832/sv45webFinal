import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Footer } from "./footer/footer";
import { SettingService } from './services/setting-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, TranslateModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('final');
currentLang: string = localStorage.getItem('appLang') || 'en';

  constructor(private translate: TranslateService,
    private settingService : SettingService
  ) {
    const savedLang = localStorage.getItem('appLang');
    if (savedLang) {
      this.translate.use(savedLang);
    }
  }

}
