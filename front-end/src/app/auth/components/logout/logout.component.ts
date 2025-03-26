import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth.actions';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '<div>Logging out...</div>'
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
