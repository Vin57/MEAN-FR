import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

export abstract class BaseFormBuilder extends FormBuilder {

  constructor(
    protected _form?: FormGroup,
    protected _submit?: CallableFunction
  ) {
    super();
  }

  public withSubmit(submit: CallableFunction): this
  {
    this._submit = submit;
    return this;
  }

  /**
   * Build current _form form with given data.
   * @param data
   * @returns
   */
  protected build(data: Object = {}): FormGroup
  {
    if (!this._form) {
      // If the child class have not initialized the _form, do it with given data.
      this._form = this.group(data);
    }

    let submit = this._submit;
    let form = this._form;

    // Initialize default behavior for value change event.
    this.subscribeValueChange(form, submit);

    this.reset();

    return form;
  }

  protected subscribeValueChange(form: FormGroup, submit?: CallableFunction): void
  {
    form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(_ => {
      if (!form.valid) {
        // The form is not valid, update message errors.
        this.updateErrorMessages(form);
      }

      if (submit) {
        return submit(form) // The form is valid, submit the query
      }
    });
  }

  /**
   * Update error violation into translated error messages.
   * @returns ValidationsErrors Errors foreach control of the form.
   */
  private updateErrorMessages(form: FormGroup): void
  {
    let errors: ValidationErrors = [];
    Object.keys(form.controls).forEach(key => {
      let control:AbstractControl = form.get(key);
      // Check if control has error
      if (!control.errors) {
        return; // There is no error, continue to next control of this form
      }
      errors[key] = control.errors;
    });

    // Translate the error messages...
    this.translateErrorMessage(errors);
  }

  /**
   * Take Validation errors as :
   * {search: {minlength: {requiredLength: 3, actualLength: 1}}}
   * ...Into a translated error messages :
   * {search: {minlength: "At least 3 characters required."}}
   */
  private translateErrorMessage(violations: ValidationErrors): ValidationErrors {
    let locale: string = 'fr';
    // Fetch structured translated message as :
    // {search: {minlength: {en: "At least {{requiredLength}} characters are required."}}}
    let translatedErrorMessages = this.getErrorMessages();
    // Match ValidationError with translated error messages
    for (let [field, violationConstraint] of Object.entries(violations)) { // search: {minlength: {requiredLength: 3, actualLength: 1}}
      if (!translatedErrorMessages.hasOwnProperty(field)) {
        // No translated error message for this field.
        console.log(`Missing translation for ${field}`);
        return; // Continue to next ValidationError
      }

      // Check if we have translation error messages for each of the constraint violation
      for (let [violationName, violationData] of Object.entries(violationConstraint)) { // minlength: {requiredLength: 3, actualLength: 1}
        if (!translatedErrorMessages[field].hasOwnProperty(violationName)) {
          console.log(`Missing translation for ${field} on violation ${violationName}`);
          return; // Continue to next ValidationError
        }

        // Check if this is there is a translated message in the user locale for this field violation.
        if (!translatedErrorMessages[field][violationName].hasOwnProperty(locale)) {
          // @TODO Use english message as default, if there is no english message, use default error message.
          // There is no translated message for the user locale.
          console.log(`Missing translation for ${field} on violation ${violationName} for locale ${locale}`);
        }

        // Perfect ! We got a translated message which match exactly the violation we had.
        violations[field][violationName] = translatedErrorMessages[field][violationName][locale];
        for (let [violation, value] of Object.entries(violationData)) {
          violations[field][violationName] = violations[field][violationName].replace(`{{${violation}}}`, value);
        }
      }
    };

    return violations;
  }

  /**
   * Reset every data for this builder.
   */
  private reset(): void
  {
    this._form = null;
    this._submit = null;
  }

  /**
   * Define error messages here indexed for each locales.
   *
   * Exemple :
   * {
   *   search: {
   *       minlength: {fr: "Au moins {{nbr}} caractères sont requis."},
   *       maxlength: {fr: "{{nbr}} caractères maximum."}
   *     }
   *   }
   * }
   */
  protected abstract getErrorMessages() : {[field: string]: {[messageKey: string]: {[locale:string]: string}}};
}
