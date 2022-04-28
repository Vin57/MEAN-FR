import { NgModule } from '@angular/core';
import { IsStringPipe } from './filterstring.pipe';


@NgModule({
	declarations: [
		IsStringPipe,
	],
	imports: [],
	exports: [
		IsStringPipe,
	]
})

export class Pipes { }
