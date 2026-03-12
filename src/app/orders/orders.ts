import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api-service';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
  export class Orders {
    public  api = inject(ApiService);
    orders$ = this.api.orders$;

    
    constructor(private translate: TranslateService) {}

    

    
  }