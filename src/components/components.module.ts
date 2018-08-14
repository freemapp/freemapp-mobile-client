import { NgModule } from '@angular/core';
import { FmaServiceListComponent } from './fma-service-list/fma-service-list';
import { CommonModule } from '../../node_modules/@angular/common';
import { IonicModule } from 'ionic-angular';
import { FmaServiceItemComponent } from './fma-service-item/fma-service-item';
import { FmaSubscriberListComponent } from './fma-subscriber-list/fma-subscriber-list';
import { FmaSubscriberItemComponent } from './fma-subscriber-item/fma-subscriber-item';
import { FmaAppHeadingComponent } from './fma-app-heading/fma-app-heading';
@NgModule({
	declarations: [
    FmaServiceListComponent,
    FmaServiceItemComponent,
    FmaSubscriberListComponent,
    FmaSubscriberItemComponent,
    FmaAppHeadingComponent
  ],
	imports: [
    IonicModule,
    CommonModule
  ],
	exports: [
    FmaServiceListComponent,
    FmaServiceItemComponent,
    FmaSubscriberListComponent,
    FmaSubscriberItemComponent,
    FmaAppHeadingComponent
  ]
})
export class ComponentsModule {}
