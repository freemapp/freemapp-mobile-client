import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ScrollEvent } from 'ionic-angular';
import { Observable } from 'rxjs';

/**
 * Generated class for the FmaAppHeadingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fma-app-heading',
  templateUrl: 'fma-app-heading.html'
})
export class FmaAppHeadingComponent  {
  // @Input('onScroll') onScroll: Observable<ScrollEvent>;
  @Input('onScroll') set onScroll(event: Observable<ScrollEvent>) {
    // event.subscribe((scrollData: ScrollEvent) => {
    //   if (this.appHeader) {
    //     if (scrollData.scrollTop > 5)
    //       this.appHeader.nativeElement.style.paddingTop = "0px";

    //     else
    //     this.appHeader.nativeElement.style.paddingTop = "175px";
    //   }
    // });
  };
  @Output('doSearch') doSearch: EventEmitter<any>;
  @ViewChild('appHeader') appHeader: ElementRef;

  searchText: string = '';

  constructor() {
    this.doSearch = new EventEmitter<any>();
  }

  onIonInput(event: any): void {
    this.doSearch.emit(this.searchText);
  }

}
