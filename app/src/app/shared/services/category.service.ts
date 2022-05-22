import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICategory } from 'src/app/logic/interfaces/category.interface';

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categories$: BehaviorSubject<ICategory[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public fetch(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${HTTP_API}/categories`)
        .pipe(
          tap((category: ICategory[]) => {
          this.categories$.next(category);
        })
      );
  }
}
