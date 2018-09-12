import { NgModule } from '@angular/core';
import { FmaServiceListComponent } from '@fma_components/fma-service-list/fma-service-list';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FmaServiceItemComponent } from '@fma_components/fma-service-item/fma-service-item';
import { FmaSubscriberListComponent } from '@fma_components/fma-subscriber-list/fma-subscriber-list';
import { FmaSubscriberItemComponent } from '@fma_components/fma-subscriber-item/fma-subscriber-item';
import { FmaAppHeadingComponent } from '@fma_components/fma-app-heading/fma-app-heading';
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
