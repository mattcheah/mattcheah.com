import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamelCasePipe } from './camel-case.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CamelCasePipe],
  exports: [CamelCasePipe]
})
export class PipesModule { }
