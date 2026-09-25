import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { isFirebaseConfigured } from '../../firebase.config';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  configured = isFirebaseConfigured();
  email = '';
  password = '';
  error = signal<string | null>(null);
  loading = signal(false);

  async submit(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/admin');
    } catch {
      this.error.set('Identifiants incorrects.');
    } finally {
      this.loading.set(false);
    }
  }
}
