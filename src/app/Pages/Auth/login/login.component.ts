import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../../Core/Service/auth.service';
import { ToastComponent } from '../../../Components/toast/toast.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  message = '';
  toastMessage = '';
  toastColor = '';
  showToast = false;

  constructor(private authService: AuthService, private _Router: Router) {}

  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]),
  });

  signIn(formInfo: FormGroup) {
    this.isLoading = true;

    this.authService.Signin(formInfo.value).subscribe(
      (res) => {
        if(res.success){
        localStorage.setItem('TokenMelie', res.result.token);
        localStorage.setItem('userId', res.result.userId);
        this.isLoading = false;
        this._Router.navigate(['/meilisearch']);
        }

      },
      (error) => {
        this.isLoading = false;
        this.message = error.error.message;
        this.showToast = true;
        this.toastMessage = this.message;
      }
    );
  }
}
