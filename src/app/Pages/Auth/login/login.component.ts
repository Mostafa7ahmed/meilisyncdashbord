import { ToastService } from './../../../Core/Service/toast.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../../Core/Service/auth.service';
import { Component } from '@angular/core';
import { ToastComponent } from "../../../Components/toast/toast.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isloading: boolean = false;
  message: string = "";
  toastMessage: string = '';
  toastColor: string = '';
  showToast: boolean = false;
  constructor(private _AuthService: AuthService, private toastService: ToastService , private Router:Router) { }

  siginForm: FormGroup = new FormGroup({
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

  Sigin(formInfo: FormGroup) {
    this.isloading = true;

    this._AuthService.Signin(formInfo.value).subscribe(
      (res) => {
        this.isloading = false;
        if (res.success) {
          localStorage.setItem("TokenMelie", res.result.token);
          localStorage.setItem("userId", res.result.userId);
          this.message = res.message;
          this.Router.navigate(['./home']);
  
          
        }
      },
      (error) => {
        this.isloading = false;
        this.message = error.error.message;
        this.showToast=true;
        this.toastMessage= this.message
      }
    );
  }

}
