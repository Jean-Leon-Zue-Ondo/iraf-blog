import { Component, Input, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { resolveVideoEmbed } from '../../utils/video-embed';

@Component({
  selector: 'app-video-embed',
  standalone: true,
  templateUrl: './video-embed.html',
  styleUrl: './video-embed.css',
})
export class VideoEmbedComponent {
  @Input({ required: true }) url!: string;

  private sanitizer = inject(DomSanitizer);

  get embed() {
    const resolved = resolveVideoEmbed(this.url);
    if (!resolved) return null;
    if (resolved.kind === 'iframe') {
      return { kind: 'iframe' as const, safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(resolved.url) };
    }
    return { kind: 'file' as const, url: resolved.url };
  }
}
