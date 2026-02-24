import { Component ,input} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';


  @Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
 constructor(
    private title: Title,
    private translate: TranslateService
  ) {
    this.setPageTitle();
  }

  private setPageTitle() {
    this.translate.get('navitem.orders').subscribe((res) => {
      this.title.setTitle(res);
    });
  }

  pageId = input.required<string>();
}
