import { Component} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notfound',
  imports: [TranslatePipe],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class Notfound {
  constructor(private title: Title, private router: Router) {
    // This gets the current URL path (e.g., /abc)
    const currentPath = this.router.url;
    
    // Set the title: "Not Found - /abc"
    this.title.setTitle(`Not Found - ${currentPath}`);
  }
  goBackHome() {
    this.router.navigateByUrl('/')
  }
}
