import { Component, Input, OnChanges, OnDestroy, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';
import { VideoEmbedComponent } from '../video-embed/video-embed';

const AUTOPLAY_DELAY_MS = 7000;

@Component({
  selector: 'app-article-featured',
  standalone: true,
  imports: [RouterLink, VideoEmbedComponent],
  templateUrl: './article-featured.html',
  styleUrl: './article-featured.css',
})
export class ArticleFeaturedComponent implements OnChanges, OnDestroy {
  @Input() articles: Article[] = [];

  private indexSig = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  currentIndex = this.indexSig.asReadonly();
  current = computed(() => this.articles[this.indexSig()]);

  ngOnChanges(): void {
    this.indexSig.set(0);
    this.restartAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  goTo(i: number): void {
    this.indexSig.set(i);
    this.restartAutoplay();
  }

  onPrev(): void {
    this.indexSig.update((i) => (i - 1 + this.articles.length) % this.articles.length);
    this.restartAutoplay();
  }

  onNext(): void {
    this.indexSig.update((i) => (i + 1) % this.articles.length);
    this.restartAutoplay();
  }

  private startAutoplay(): void {
    if (this.articles.length <= 1) return;
    this.timer = setInterval(() => {
      this.indexSig.update((i) => (i + 1) % this.articles.length);
    }, AUTOPLAY_DELAY_MS);
  }

  private stopAutoplay(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
