import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
})
export class AddItemFormComponent {
  @Input() placehold = ''
  @Output() addItem = new EventEmitter<string>()
  clicked = false
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ])
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  onAddItem() {
    this.clicked = true
    if (!this.title.errors) {
      this.addItem.emit(this.form.value.title as string)
      this.form.reset()
      Object.keys(this.form.controls).forEach(controlName => {
        this.form.get(controlName)?.setErrors(null);
      });
    } else {

    }
  }
}
