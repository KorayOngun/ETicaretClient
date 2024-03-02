import { Directive, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLoadComponent]'
})
export class DynamicLoadComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
