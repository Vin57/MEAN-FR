import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/logic/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductFormBuilder } from './form/product.form';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public categories$: ICategory[] = [];

  constructor(
    private productFormBuilder:ProductFormBuilder,
    private productService: ProductService,
    private categorieService:CategoryService
  ) {
  }

  ngOnInit(): void {
    this.categorieService.fetch().subscribe(
      (categories) => this.categories$ = categories
    );

    this.form = this.productFormBuilder.build();

    console.log(this.form);
  }

  get name(): AbstractControl|null {
    return this.form.get('name');
  }

  get description(): AbstractControl|null {
    return this.form.get('description');
  }

  get categories(): AbstractControl|null {
    return this.form.get('categories');
  }

  get price(): AbstractControl|null {
    return this.form.get('price');
  }

  submit(form: FormGroup): void
  {
    console.log('submitted');
    if (!form || !form.valid) {
      console.log('invalid', form);

      return null;
    }

    this.productService.create(form.value);
  }
}
