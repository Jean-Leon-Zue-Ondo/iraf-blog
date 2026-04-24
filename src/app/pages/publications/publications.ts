import { Component, inject } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticleMiniComponent } from '../../components/article-mini/article-mini';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [ArticleMiniComponent],
  templateUrl: './publications.html',
  styleUrl: './publications.css',
})
export class PublicationsComponent {
  private svc = inject(ArticlesService);
  articles = this.svc.getRecentArticles();
}
