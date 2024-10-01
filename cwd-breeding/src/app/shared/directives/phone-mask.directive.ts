import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  private regex: RegExp = new RegExp(/^\d{0,10}$/g); // Allow only numbers
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value.replace(/\D/g, '');
    let next: string = current.concat(event.key);
    
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const input = this.el.nativeElement;
    const rawValue = input.value.replace(/\D/g, '');
    if (rawValue.length <= 3) {
      input.value = rawValue;
    } else if (rawValue.length <= 6) {
      input.value = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    } else {
      input.value = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 6)}-${rawValue.slice(6, 10)}`;
    }
  }
}
