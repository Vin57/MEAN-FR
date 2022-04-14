import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

import { ISearchProduct } from 'src/app/features/product/product-container/product-list/form/product-search.type';
import { BaseFormBuilder } from "src/app/shared/form/base-form.builder";

@Injectable({
  providedIn: 'root',
})
export class ProductSearchFormBuilder extends BaseFormBuilder {

  build(data: ISearchProduct = {search: ''}): FormGroup
  {
    this._form = this.group({
      search: [
        data.search,
        [
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ]
    });

    return super.build(data);
  }

  public getErrorMessages()
  {
    return {
      search: {
        minlength: {
          fr: "Au moins {{requiredLength}} caractères sont requis."
        },
        maxlength: {
          fr: "{{nbr}} caractères maximum."
        }
      }
    }
  }

  public submit(form: FormGroup): void {
    throw new Error("Method not implemented.");
  }
}
