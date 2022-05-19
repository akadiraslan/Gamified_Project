import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NgxAuthComponent,
  NgxLoginComponent,
  NgxRegisterComponent,
  NgxLogoutComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
  NgxRegisterConfirmComponent, NgxOtpComponent, NgxChangeEmailComponent
} from './components';

const routes: Routes = [{
  path: '',
  component: NgxAuthComponent,
  children: [
    {
      path: '',
      component: NgxLoginComponent,
    },
    {
      path: 'otp',
      component: NgxOtpComponent,
    },
    {
      path: 'login',
      component: NgxLoginComponent,
    },
    {
      path: 'register',
      component: NgxRegisterComponent,
    },
    {
      path: 'logout',
      component: NgxLogoutComponent,
    },
    {
      path: 'request-password',
      component: NgxRequestPasswordComponent,
    },
    {
      path: 'reset-password/:token',
      component: NgxResetPasswordComponent,
    },
    {
      path: 'register-confirm/:email/:confirm_token',
      component: NgxRegisterConfirmComponent,
    },
    {
      path: 'change-email/:email/:confirm_token',
      component: NgxChangeEmailComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
