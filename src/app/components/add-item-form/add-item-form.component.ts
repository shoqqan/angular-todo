import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TitleCasePipe, NgIf],
})
export class AddItemFormComponent {
  @Input() placehold = '';
  @Output() addItem = new EventEmitter<string>();
  clicked = false;
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
    ])
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  onAddItem() {
    this.clicked = true;
    if (!this.title.errors) {
      this.addItem.emit(this.form.value.title as string);
      this.form.reset();
      this.clicked = false;
    } else {
//TODO
    }
  }
}
