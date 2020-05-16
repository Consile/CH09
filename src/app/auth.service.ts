import { Injectable } from '@angular/core';
import { flatten } from '@angular/compiler';

@Injectable()
export class AuthService {
    isLoggedIn = false;

    login() {
        this.isLoggedIn = true;
    }

    logout() {
        this.isLoggedIn = false;
    }

    loggedIn() {
        return this.isLoggedIn;
    }
}
