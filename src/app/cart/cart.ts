// cart.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './cart.html'
})
export class Cart  {
public api = inject(ApiService);
cartItem$ = this.api.cart$ ;


}