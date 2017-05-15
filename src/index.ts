import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylusComponent } from './stylus.component';
import { StylusService } from './stylus.service';

export * from './stylus.component';
export * from './stylus.service';
export * from './lib/myScript/index';

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
  static forRoot(applicationKey: string, hmacKey: string, host?: string): ModuleWithProviders {
    return {
      ngModule: SirusStylusModule,
      providers: [
        {
          provide: StylusService,
          useFactory: () => {
            return new StylusService(applicationKey, hmacKey, host);
          }
        }
      ]
    };
  }
}
