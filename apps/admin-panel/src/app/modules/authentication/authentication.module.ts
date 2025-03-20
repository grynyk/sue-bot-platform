import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    AuthContainerComponent
  ],
})
export class AuthenticationModule {}
