import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,  // ← Necesario para *ngIf
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons,      // ← Faltaba
    IonBackButton    // ← Faltaba
  ]
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() backButton: string = '';  // ← Valor por defecto

  constructor() { }
  
  ngOnInit() { }
}