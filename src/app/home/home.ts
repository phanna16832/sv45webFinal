import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api-service/api-service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
products: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error('Fails to fetch products', err)
    });
  }
}
