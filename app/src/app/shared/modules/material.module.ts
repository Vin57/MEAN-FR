import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select'

const MATERIALS = [
    MatInputModule
  , MatIconModule
  , MatListModule
  , MatToolbarModule
  , MatCardModule
  , MatButtonModule
  , MatGridListModule
  , MatChipsModule
  , MatSelectModule
];

@NgModule({
  declarations: [],
  imports: MATERIALS,
  exports: MATERIALS
})
export class MaterialModule { }
