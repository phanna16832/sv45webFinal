// cart.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api-service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, TranslateModule], 
  templateUrl: './cart.html'
})
export class Cart  {
public api = inject(ApiService);
cartItem$ = this.api.cart$ ;


}