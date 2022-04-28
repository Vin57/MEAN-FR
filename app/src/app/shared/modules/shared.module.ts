import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipes } from '../pipe/pipes';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
      CommonModule
    , FormsModule
    , MaterialModule
    , ReactiveFormsModule
    , Pipes
  ],
  exports: [
      CommonModule
    , FormsModule
    , MaterialModule
    , ReactiveFormsModule
    , Pipes
  ]
})
export class SharedModule { }
