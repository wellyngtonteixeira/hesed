import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

@NgModule({
	declarations: [GoogleLoginComponent],
	imports: [IonicModule, CommonModule],
	exports: [GoogleLoginComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
