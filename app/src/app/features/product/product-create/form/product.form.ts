import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ICategory } from "src/app/logic/interfaces/category.interface";

import { BaseFormBuilder } from "src/app/shared/form/base-form.builder";
import { CategoryService } from "src/app/shared/services/category.service";
import { IProductForm } from "./product.type";

@Injectable({
  providedIn: 'root',
})
export class ProductFormBuilder extends BaseFormBuilder
{
  public build(data: IProductForm = {
    name: '',
    description: "",
    price: 0,
    categories: null
  }): FormGroup
  {
    return super.build({
      name: [
        data.name,
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.required
        ]
      ],
      description: [
        data.description,
        [
          Validators.required
        ]
      ],
      categories: [data.categories, []],
      price: [
        data.price,
        [
          Validators.min(0),
          Validators.max(99999999),
          Validators.required
        ]
      ]
    });
  }

  public getErrorMessages()
  {
    return {
      name: {
        minlength: {
          fr: "Au moins {{requiredLength}} caractères sont requis."
        },
        maxlength: {
          fr: "{{actualLength}}/{{requiredLength}} caractères maximum."
        },
        required: {
          fr: "Le nom est requis"
        }
      },
      description: {
        required: {
          fr: "La description est requise"
        }
      },
      categories: {},
      price: {
        min: {
          fr: "La valeur doit être positive"
        },
        max: {
          fr: "La valeur doit être inférieur à 99999999"
        },
        required: {
          fr: "Le prix est requis"
        }
      }
    }
  }

  protected submit(form: FormGroup): void {
    throw new Error("Method not implemented.");
  }
}
