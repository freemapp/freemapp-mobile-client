import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FmaServiceListComponent } from '@fma_components/fma-service-list/fma-service-list';
import { FmaServiceItemComponent } from '@fma_components/fma-service-item/fma-service-item';
import { FmaSubscriberListComponent } from '@fma_components/fma-subscriber-list/fma-subscriber-list';
import { FmaSubscriberItemComponent } from '@fma_components/fma-subscriber-item/fma-subscriber-item';
import { FmaAppHeadingComponent } from '@fma_components/fma-app-heading/fma-app-heading';
import { FmaAvatarEditorComponent } from '@fma_components/fma-avatar-editor/fma-avatar-editor';
@NgModule({
	declarations: [
    FmaServiceListComponent,
    FmaServiceItemComponent,
    FmaSubscriberListComponent,
    FmaSubscriberItemComponent,
    FmaAppHeadingComponent,
    FmaAvatarEditorComponent
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
    FmaAppHeadingComponent,
    FmaAvatarEditorComponent
  ]
})
export class ComponentsModule {}
