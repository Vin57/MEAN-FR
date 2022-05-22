import { NgModule } from '@angular/core';
import { DebugPipe } from './debug.pipe';
import { IsStringPipe } from './filterstring.pipe';


@NgModule({
	declarations: [
		IsStringPipe,
    DebugPipe
	],
	imports: [],
	exports: [
		IsStringPipe,
    DebugPipe
	]
})

export class Pipes { }
