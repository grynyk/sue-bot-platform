import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';
@NgModule({
  imports: [CommonModule, AuthRoutingModule, AuthContainerComponent],
})
export class AuthModule {}
