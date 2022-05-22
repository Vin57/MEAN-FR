import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

import { ISearchProduct } from "./product-search.type";
import { BaseFormBuilder } from "src/app/shared/form/base-form.builder";

@Injectable({
  providedIn: 'root',
})
export class ProductSearchFormBuilder extends BaseFormBuilder {

  public build(data: ISearchProduct = {search: ''}): FormGroup
  {
    return super.build({
      search: [
        data.search,
        [
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ]
    });
  }

  public getErrorMessages()
  {
    return {
      search: {
        minlength: {
          fr: "Au moins {{requiredLength}} caractères sont requis."
        },
        maxlength: {
          fr: "{{actualLength}}/{{requiredLength}} caractères maximum."
        }
      }
    }
  }

  protected submit(form: FormGroup): void {
    throw new Error("Method not implemented.");
  }
}
