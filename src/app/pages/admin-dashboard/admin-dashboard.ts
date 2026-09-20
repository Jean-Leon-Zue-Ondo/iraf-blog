import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { AuthService } from '../../services/auth.service';
import { Researcher } from '../../models/researcher.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent {
  private svc = inject(ArticlesService);
  private auth = inject(AuthService);
  private router = inject(Router);

  articles = this.svc.articles;
  researchers = this.svc.researchers;

  avatarClasses: Researcher['avatarClass'][] = ['av-green', 'av-teal', 'av-amber', 'av-sage', 'av-olive', 'av-sky'];

  articleForm = { tag: '', title: '', excerpt: '', contentText: '', author: '', date: '', readTime: '', imageUrl: '', sourceUrl: '', featured: false };
  researcherForm = { initials: '', name: '', role: '', avatarClass: 'av-green' as Researcher['avatarClass'] };

  articleError = signal<string | null>(null);
  articleSaving = signal(false);
  researcherError = signal<string | null>(null);
  researcherSaving = signal(false);

  async submitArticle(): Promise<void> {
    this.articleError.set(null);
    this.articleSaving.set(true);
    try {
      const content = this.articleForm.contentText
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean);

      await this.svc.addArticle({
        tag: this.articleForm.tag,
        title: this.articleForm.title,
        excerpt: this.articleForm.excerpt,
        content,
        author: this.articleForm.author,
        date: this.articleForm.date,
        readTime: this.articleForm.readTime,
        imageUrl: this.articleForm.imageUrl,
        sourceUrl: this.articleForm.sourceUrl,
        featured: this.articleForm.featured,
      });
      this.articleForm = { tag: '', title: '', excerpt: '', contentText: '', author: '', date: '', readTime: '', imageUrl: '', sourceUrl: '', featured: false };
    } catch (e) {
      this.articleError.set(e instanceof Error ? e.message : 'Erreur lors de l\'enregistrement.');
    } finally {
      this.articleSaving.set(false);
    }
  }

  async removeArticle(id: string): Promise<void> {
    if (!confirm('Supprimer cet article ?')) return;
    try {
      await this.svc.deleteArticle(id);
    } catch (e) {
      this.articleError.set(e instanceof Error ? e.message : 'Erreur lors de la suppression.');
    }
  }

  async submitResearcher(): Promise<void> {
    this.researcherError.set(null);
    this.researcherSaving.set(true);
    try {
      await this.svc.addResearcher({ ...this.researcherForm });
      this.researcherForm = { initials: '', name: '', role: '', avatarClass: 'av-green' };
    } catch (e) {
      this.researcherError.set(e instanceof Error ? e.message : 'Erreur lors de l\'enregistrement.');
    } finally {
      this.researcherSaving.set(false);
    }
  }

  async removeResearcher(id: string): Promise<void> {
    if (!confirm('Supprimer ce chercheur ?')) return;
    try {
      await this.svc.deleteResearcher(id);
    } catch (e) {
      this.researcherError.set(e instanceof Error ? e.message : 'Erreur lors de la suppression.');
    }
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigateByUrl('/admin/login');
  }
}
