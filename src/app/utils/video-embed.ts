export type ResolvedVideoEmbed =
  | { kind: 'iframe'; url: string }
  | { kind: 'file'; url: string };

/** Turns a pasted YouTube/Vimeo/direct-file link into something embeddable. */
export function resolveVideoEmbed(videoUrl: string): ResolvedVideoEmbed | null {
  const url = videoUrl?.trim();
  if (!url) return null;

  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/,
  );
  if (youtubeMatch) {
    return { kind: 'iframe', url: `https://www.youtube.com/embed/${youtubeMatch[1]}` };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return { kind: 'iframe', url: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  return { kind: 'file', url };
}
