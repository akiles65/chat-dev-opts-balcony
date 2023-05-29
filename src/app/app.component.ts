import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Conversaciones', url: '/conversations', icon: 'chatbubbles' },
    { title: 'Lista de Usuarios', url: '/users', icon: 'people' },
    { title: 'Actualizar Usuario', url: '/settings', icon: 'settings' },
    { title: 'Salir', url: '/login', icon: 'exit' },
  ];
  constructor() { }

}
