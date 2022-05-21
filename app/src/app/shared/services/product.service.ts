import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IProduct } from '../../logic/interfaces/product.interface';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { ISearchProduct } from 'src/app/features/product/product-container/product-form/form/product-search.type';

const HTTP_API = '/api/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products$: BehaviorSubject<IProduct[]> = new BehaviorSubject(null);
  public subject = new Subject();

  constructor(private http: HttpClient) {
    this.subject.pipe(
      debounceTime(500),
      switchMap(search =>
        this.http.get<IProduct[]>(`${HTTP_API}products?search=${search}`)
      ),
      tap(data => {
        this.products$.next(data);
      })
    ).subscribe();
  }

  public fetchProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${HTTP_API}products`)
        .pipe(
          tap((products$: IProduct[]) => {
          this.products$.next(products$);
        })
      );
  }

  public searchProducts(searchProduct: ISearchProduct) {
    this.subject.next(searchProduct.search);
  }
}
