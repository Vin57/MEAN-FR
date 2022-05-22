import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/logic/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products$: BehaviorSubject<IProduct[]>;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;
    this.productService.fetch().subscribe();
  }
}
