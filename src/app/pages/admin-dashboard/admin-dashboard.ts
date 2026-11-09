import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { SiteSectionsService } from '../../services/site-sections.service';
import { AuthService } from '../../services/auth.service';
import { Researcher } from '../../models/researcher.model';
import { Partnership } from '../../models/partnership.model';
import { Activity } from '../../models/activity.model';
import { NewsItem } from '../../models/news-item.model';
import { TrainingProgram } from '../../models/training-program.model';
import { ResearchProgram } from '../../models/research-program.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent {
  private svc = inject(ArticlesService);
  private sections = inject(SiteSectionsService);
  private auth = inject(AuthService);
  private router = inject(Router);

  articles = this.svc.articles;
  researchers = this.svc.researchers;
  partnerships = this.sections.partnerships;
  activities = this.sections.activities;
  news = this.sections.news;
  trainings = this.sections.trainings;
  researchPrograms = this.sections.researchPrograms;

  avatarClasses: Researcher['avatarClass'][] = ['av-green', 'av-teal', 'av-amber', 'av-sage', 'av-olive', 'av-sky'];
  partnershipTypes: Partnership['type'][] = ['Recherche', 'Université', 'ONG', 'Bailleur de fonds', 'Entreprise', 'Institution publique'];
  activityCategories: Activity['category'][] = ['Mission de terrain', 'Atelier', 'Formation interne', 'Conférence', 'Visite institutionnelle'];
  newsCategories: NewsItem['category'][] = ['Annonce', 'Événement', 'Partenariat', 'Distinction', 'Publication'];
  trainingLevels: TrainingProgram['level'][] = ['Doctorat', 'Master', 'Stage', 'Formation continue'];

  articleForm = { tag: '', title: '', excerpt: '', contentText: '', author: '', date: '', readTime: '', imageUrl: '', videoUrl: '', sourceUrl: '', featured: false };
  researcherForm = { initials: '', name: '', role: '', avatarClass: 'av-green' as Researcher['avatarClass'] };
  partnershipForm = { name: '', type: 'Recherche' as Partnership['type'], country: '', description: '', websiteUrl: '' };
  activityForm = { title: '', category: 'Mission de terrain' as Activity['category'], date: '', location: '', description: '', imageUrl: '' };
  newsForm = { title: '', excerpt: '', date: '', category: 'Annonce' as NewsItem['category'], imageUrl: '' };
  trainingForm = { title: '', level: 'Doctorat' as TrainingProgram['level'], duration: '', description: '', contactInfo: '' };
  researchProgramForm = { axis: '', period: '', objectives: '', description: '' };

  articleError = signal<string | null>(null);
  articleSaving = signal(false);
  researcherError = signal<string | null>(null);
  researcherSaving = signal(false);
  partnershipError = signal<string | null>(null);
  partnershipSaving = signal(false);
  activityError = signal<string | null>(null);
  activitySaving = signal(false);
  newsError = signal<string | null>(null);
  newsSaving = signal(false);
  trainingError = signal<string | null>(null);
  trainingSaving = signal(false);
  researchProgramError = signal<string | null>(null);
  researchProgramSaving = signal(false);

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
        videoUrl: this.articleForm.videoUrl,
        sourceUrl: this.articleForm.sourceUrl,
        featured: this.articleForm.featured,
      });
      this.articleForm = { tag: '', title: '', excerpt: '', contentText: '', author: '', date: '', readTime: '', imageUrl: '', videoUrl: '', sourceUrl: '', featured: false };
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

  async submitPartnership(): Promise<void> {
    this.partnershipError.set(null);
    this.partnershipSaving.set(true);
    try {
      await this.sections.addPartnership({ ...this.partnershipForm });
      this.partnershipForm = { name: '', type: 'Recherche', country: '', description: '', websiteUrl: '' };
    } catch (e) {
      this.partnershipError.set(e instanceof Error ? e.message : 'Erreur lors de l\'enregistrement.');
    } finally {
      this.partnershipSaving.set(false);
    }
  }

  async removePartnership(id: string): Promise<void> {
    if (!confirm('Supprimer ce partenaire ?')) return;
    try {
      await this.sections.deletePartnership(id);
    } catch (e) {
      this.partnershipError.set(e instanceof Error ? e.message : 'Erreur lors de la suppression.');
    }
  }

  async submitActivity(): Promise<void> {
    this.activityError.set(null);
    this.activitySaving.set(true);
    try {
      await this.sections.addActivity({ ...this.activityForm });
      this.activityForm = { title: '', category: 'Mission de terrain', date: '', location: '', description: '', imageUrl: '' };
    } catch (e) {
      this.activityError.set(e instanceof Error ? e.message : 'Erreur lors de l\'enregistrement.');
    } finally {
      this.activitySaving.set(false);
    }
  }

  async removeActivity(id: string): Promise<void> {
    if (!confirm('Supprimer cette activité ?')) return;
    try {
      await this.sections.deleteActivity(id);
    } catch (e) {
      this.activityError.set(e instanceof Error ? e.message : 'Erreur lors de la suppression.');
    }
  }

  async submitNews(): Promise<void> {
    this.newsError.set(null);
    this.newsSaving.set(true);
    try {
      await this.sections.addNewsItem({ ...this.newsForm });
      this.newsForm = { title: '', excerpt: '', date: '', category: 'Annonce', imageUrl: '' };
    } catch (e) {
      this.newsError.set(e instanceof Error ? e.message : 'Erreur lors de l\'enregistrement.');
    } finally {
      this.newsSaving.set(false);
    }
  }

  async removeNews(id: string): Promise<void> {
    if (!confirm('Supprimer cette actualité ?')) return;
    try {
      await this.sections.deleteNewsItem(id);
    } catch (e) {
      this.newsError.set(e instanceof Error ? e.message : 'Erreur lors de la suppression.');
    }
  }

  async submitTraining(): Promise<void> {
    this.trainingError.set(null);
    this.trainingSaving.set(true);
    try {
      await this.sections.addTraining({ ...this.trainingForm });
      this.trainingForm = { title: '', level: 'Doctorat', duration: '', description: '', contactInfo: '' };
    } catch (e) {
      this.trainingError.set(e instanceof Error ? e.message : 'Erreur lors de l\'enregistrement.');
    } finally {
      this.trainingSaving.set(false);
    }
  }

  async removeTraining(id: string): Promise<void> {
    if (!confirm('Supprimer ce programme de formation ?')) return;
    try {
      await this.sections.deleteTraining(id);
    } catch (e) {
      this.trainingError.set(e instanceof Error ? e.message : 'Erreur lors de la suppression.');
    }
  }

  async submitResearchProgram(): Promise<void> {
    this.researchProgramError.set(null);
    this.researchProgramSaving.set(true);
    try {
      await this.sections.addResearchProgram({ ...this.researchProgramForm });
      this.researchProgramForm = { axis: '', period: '', objectives: '', description: '' };
    } catch (e) {
      this.researchProgramError.set(e instanceof Error ? e.message : 'Erreur lors de l\'enregistrement.');
    } finally {
      this.researchProgramSaving.set(false);
    }
  }

  async removeResearchProgram(id: string): Promise<void> {
    if (!confirm('Supprimer cet axe de programmation ?')) return;
    try {
      await this.sections.deleteResearchProgram(id);
    } catch (e) {
      this.researchProgramError.set(e instanceof Error ? e.message : 'Erreur lors de la suppression.');
    }
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigateByUrl('/admin/login');
  }
}
