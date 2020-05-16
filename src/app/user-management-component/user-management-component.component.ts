import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ID } from './user';

@Component({
  selector: 'app-user-management-component',
  templateUrl: './user-management-component.component.html',
  styleUrls: ['./user-management-component.component.css']
})
export class UserManagementComponentComponent implements OnInit {

  myForm: FormGroup;
  id: AbstractControl;
  userName: AbstractControl;
  password: AbstractControl;
  ids$: Observable<ID>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: ID;


  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'id': [''],
      'userName': [''],
      'password': ['']
    });

    this.id = this.myForm.controls['id'];
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }

  /* 页面初始化 */
  ngOnInit(): void {
    this.ids$ = <Observable<ID>>this.httpClient.get(this.baseUrl + 'ids');
  }

  search() {
    if (this.id.value) {
      this.ids$ = <Observable<ID>>this.httpClient.get(this.baseUrl + 'ids/' + this.id.value);
    } else {
      this.ids$ = <Observable<ID>>this.httpClient.get(this.baseUrl + 'ids');
    }
  }

  add() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'ids', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功!');
        }
      }
    );
  }

  select(i: ID) {
    this.currentUser = i;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.delete(this.baseUrl + 'ids/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功!');
          }
        }
      );
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.put(this.baseUrl + 'ids', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
          }
        }
      );
    }
  }
}
