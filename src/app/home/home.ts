import { CommonModule } from '@angular/common';
import { Component,inject,OnInit } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ApiService, product } from '../services/api-service';
@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private api = inject(ApiService);
  constructor(private translate: TranslateModule) {}
  products$ = this.api.getProduct();
  buyItem(product: any) {
  this.api.addToCart(product);
  alert('Added to cart!'); // Optional: simple feedback for beginners
}
}
