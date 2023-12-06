import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';


@Directive({
  selector: '[appEditable]'
})
export class EditableDirective {

  @Output()

  edit = new EventEmitter<string>();
  @HostBinding('attr.contenteditable')
  contenteditable = false;
  inputValue = '';
  oldValue = '';

  constructor(private ref: ElementRef) {
  }

  onChange() {
    if (this.inputValue.trim().length > 0) {
      this.edit.emit(this.inputValue as string);
      this.contenteditable = false;
    } else {
      this.ref.nativeElement.textContent = this.oldValue;
      this.contenteditable = false;
    }
  }

  @HostListener('click')
  onEditClick() {
    this.oldValue = this.ref.nativeElement.textContent;
    this.contenteditable = true;
  }

  @HostListener('input', ['$event.target.textContent'])
  onInput(value: string) {
    this.inputValue = value;
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    this.onChange();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.onChange();
    }
  }
}
