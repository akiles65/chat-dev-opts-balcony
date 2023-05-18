import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Conversations', url: '/conversations', icon: 'chatbubbles' },
    { title: 'Users', url: '/users', icon: 'people' },
    { title: 'User Settings', url: '/settings', icon: 'settings' },
    { title: 'Exit', url: '/login', icon: 'exit' },
  ];
  constructor() { }
}
