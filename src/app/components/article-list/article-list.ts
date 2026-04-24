import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { ArticleFeaturedComponent } from '../article-featured/article-featured';
import { ArticleMiniComponent } from '../article-mini/article-mini';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [RouterLink, ArticleFeaturedComponent, ArticleMiniComponent],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css',
})
export class ArticleListComponent {
  private svc = inject(ArticlesService);
  featured = this.svc.getFeaturedArticle();
  articles = this.svc.getRecentArticles();
}
