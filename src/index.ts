import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylusComponent } from './stylus.component';
import { StylusService, StylusServiceProvider } from './stylus.service';

export * from './stylus.component';
export * from './stylus.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StylusComponent
  ],
  exports: [
    StylusComponent
  ]
})
export class SirusStylusModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SirusStylusModule,
      providers: [
        StylusServiceProvider
      ]
    };
  }
}
