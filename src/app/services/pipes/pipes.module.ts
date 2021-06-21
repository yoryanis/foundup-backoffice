import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnumPipe } from './enum.pipe';

@NgModule({
  declarations: [EnumPipe],
  imports: [CommonModule],
  exports: [EnumPipe],
})
export class PipesModule {
  static forRoot(): ModuleWithProviders<PipesModule> {
    return {
      ngModule: PipesModule,
    };
  }
}
