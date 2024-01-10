import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNumberRegex]'
})
export class NumberRegexDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('input', ['$event']) onInput() {
    const inputElement = this.el.nativeElement;
    const inputValue = inputElement.value;
    const newValue = inputValue.replace(/[^0-9]/g, '');
    if (inputValue !== newValue) {
      this.renderer.setProperty(inputElement, 'value', newValue);
    }
  }
}
