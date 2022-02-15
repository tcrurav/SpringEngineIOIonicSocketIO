import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  messages = [];
  nickname = '';
  message = '';

  constructor(private route: ActivatedRoute,
    private socket: Socket, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nickname = params['nickname'];

      this.doConnection();
    });
  }

  doConnection() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);

    this.socket.fromEvent('users-changed').subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

    this.socket.fromEvent('message').subscribe(message => {
      console.log(message)
      this.messages.push(message);
    });
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
