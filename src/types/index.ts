export interface Track {
  id: string;
  src: string;          // URL към аудио файла
  title: string;
  artist: string;
  album?: string;
  artwork?: string;      // URL към обложка
  durationSec?: number;
}

export interface Album {
  id: string;
  artist: string;
  title: string;
  cover: string;         // URL към Cover.jpg
  tracks: Track[];
}

export interface Playlist {
  id: string;
  name: string;
  trackIds: string[];
}
