import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {Store} from "@ngrx/store";
import {AuthActions} from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.loadUser());
  }
}
