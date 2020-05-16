import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {

  myForm: FormGroup;          //对应登录的表单
  userName: AbstractControl;  //输入用户名的输入控件
  password: AbstractControl;  //输入密码的输入控件
  name$: Observable<User>;  //跟踪输入 
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;

  constructor(private authService: AuthService, private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'userName': ['', Validators.compose([Validators.required, userNameValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  ngOnInit(): void {

  }

  login() {
    this.httpClient.post(this.baseUrl + 'pwd', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          this.authService.login();
          this.myForm.valid;
        }
        else {
          alert('账号密码错误');
          this.myForm.invalid;
        }
      }
    );


  }

  onSubmit(value: any) {
    console.log(value);
  }

}





