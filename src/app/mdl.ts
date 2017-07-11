/**
 * Created by vadimdez on 12/07/16.
 */
import { Directive, AfterViewInit } from '@angular/core';
declare var componentHandler: {
  upgradeAllRegistered: Function
};

@Directive({
  selector: '[mdl]'
})
export class MDL implements AfterViewInit {
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }
}