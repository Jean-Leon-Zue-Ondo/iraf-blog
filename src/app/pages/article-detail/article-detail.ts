import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ArticlesService } from '../../services/articles.service';
import { VideoEmbedComponent } from '../../components/video-embed/video-embed';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterLink, VideoEmbedComponent],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css',
})
export class ArticleDetailComponent {
  private route = inject(ActivatedRoute);
  private svc = inject(ArticlesService);

  private id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id') ?? '')), { initialValue: '' });

  article = computed(() => this.svc.articles().find((a) => a.id === this.id()));
}
