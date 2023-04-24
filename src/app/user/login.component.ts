import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Store} from "@ngrx/store";
import {AppState} from "../state/app-state";
import {getMaskUserName} from "./state/user-reducer";
// user actions
import * as UserActions from './state/user-actions';
import {Observable} from "rxjs";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle: string = 'Log In';
  maskUserName!: boolean;
  // observable
  maskUserName$!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.maskUserName$ = this.store.select(getMaskUserName);

    // this.store.select(getMaskUserName).subscribe(
    //   (maskUserName: boolean) => this.maskUserName = maskUserName
    // )

    // example using store with no type & selector
    // this.store.select('user').subscribe(
    //   user => {
    //     if (user) {
    //       this.maskUserName = user.maskUserName;
    //     }
    //   }
    // )
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    // this.maskUserName = !this.maskUserName;
    this.store.dispatch(UserActions.maskUserName());
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
