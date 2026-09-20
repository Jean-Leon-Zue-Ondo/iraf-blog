import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css',
})
export class ArticleDetailComponent {
  private route = inject(ActivatedRoute);
  private svc = inject(ArticlesService);

  article: Article | undefined = this.svc.getArticleById(Number(this.route.snapshot.paramMap.get('id')));
}
