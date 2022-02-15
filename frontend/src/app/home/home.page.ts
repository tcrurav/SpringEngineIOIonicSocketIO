import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nickname = '';

  constructor(private router: Router) { }

  joinChat() {
    this.router.navigate(['chat-room', this.nickname]);
  }

}
