import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../auth/store/auth.selectors';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile$: Observable<Profile>;

  constructor(
    private store: Store,
    private profileService: ProfileService
  ) {
    this.profile$ = this.store.select(selectUser).pipe(
      switchMap(user => {
        if (!user) return new Observable<never>(); // Handle null user case
        if (user.role === 'VENDOR') {
          return this.profileService.getVendorProfile(user.id);
        }
        return this.profileService.getUserProfile();
      })
    );
  }

  ngOnInit() {
    console.log('Profile Component Initialized');
    this.store.select(selectUser).subscribe(user => {
      console.log('Current User:', user);
    });
  }
}
