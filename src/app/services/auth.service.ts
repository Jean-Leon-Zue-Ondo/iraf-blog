import { Injectable, computed, signal } from '@angular/core';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase-client';
import { isFirebaseConfigured } from '../firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSig = signal<User | null>(null);
  private ready = signal(!isFirebaseConfigured());

  user = this.userSig.asReadonly();
  isLoggedIn = computed(() => this.userSig() !== null);
  isReady = this.ready.asReadonly();

  constructor() {
    if (isFirebaseConfigured()) {
      onAuthStateChanged(auth, (user) => {
        this.userSig.set(user);
        this.ready.set(true);
      });
    }
  }

  async login(email: string, password: string): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await signInWithEmailAndPassword(auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}
