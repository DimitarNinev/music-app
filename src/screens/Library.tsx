import { Album } from "@/types";
import { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";

const MOCK_ALBUMS: Album[] = [
  {
    id: "pearl-jam-ten",
    artist: "Pearl Jam",
    title: "Ten",
    cover: "/audio/Pearl Jam/Ten/cover.jpg",
    tracks: [
      { id: "pj-ten-1", src: "/audio/Pearl Jam/Ten/Once.mp3", title: "Once", artist: "Pearl Jam", durationSec: 231 },
      { id: "pj-ten-2", src: "/audio/Pearl Jam/Ten/Even Flow.mp3", title: "Even Flow", artist: "Pearl Jam", durationSec: 293 },
      { id: "pj-ten-3", src: "/audio/Pearl Jam/Ten/Alive.mp3", title: "Alive", artist: "Pearl Jam", durationSec: 341 },
      { id: "pj-ten-4", src: "/audio/Pearl Jam/Ten/Why Go.mp3", title: "Why Go", artist: "Pearl Jam", durationSec: 199 },
      { id: "pj-ten-5", src: "/audio/Pearl Jam/Ten/Black.mp3", title: "Black", artist: "Pearl Jam", durationSec: 343 },
      { id: "pj-ten-6", src: "/audio/Pearl Jam/Ten/Jeremy.mp3", title: "Jeremy", artist: "Pearl Jam", durationSec: 319 },
      { id: "pj-ten-7", src: "/audio/Pearl Jam/Ten/Oceans.mp3", title: "Oceans", artist: "Pearl Jam", durationSec: 164 },
      { id: "pj-ten-8", src: "/audio/Pearl Jam/Ten/Porch.mp3", title: "Porch", artist: "Pearl Jam", durationSec: 210 },
      { id: "pj-ten-9", src: "/audio/Pearl Jam/Ten/Garden.mp3", title: "Garden", artist: "Pearl Jam", durationSec: 299 },
      { id: "pj-ten-10", src: "/audio/Pearl Jam/Ten/Deep.mp3", title: "Deep", artist: "Pearl Jam", durationSec: 258 },
      { id: "pj-ten-11", src: "/audio/Pearl Jam/Ten/Release.mp3", title: "Release", artist: "Pearl Jam", durationSec: 546 },
    ],
  },
  {
    id: "soundgarden-superunknown",
    artist: "Soundgarden",
    title: "Superunknown",
    cover: "/audio/Soundgarden/Superunknown/cover.jpg",
    tracks: [
      { id: "sg-superunknown-1", src: "/audio/Soundgarden/Superunknown/Let Me Drown.mp3", title: "Let Me Drown", artist: "Soundgarden", durationSec: 231 },
      { id: "sg-superunknown-2", src: "/audio/Soundgarden/Superunknown/My Wave.mp3", title: "My Wave", artist: "Soundgarden", durationSec: 293 },
      { id: "sg-superunknown-3", src: "/audio/Soundgarden/Superunknown/Fell On Black Days.mp3", title: "Fell On Black Days", artist: "Soundgarden", durationSec: 341 },
      { id: "sg-superunknown-4", src: "/audio/Soundgarden/Superunknown/Mailman.mp3", title: "Mailman", artist: "Soundgarden", durationSec: 199 },
      { id: "sg-superunknown-5", src: "/audio/Soundgarden/Superunknown/Superunknown.mp3", title: "Superunknown", artist: "Soundgarden", durationSec: 343 },
      { id: "sg-superunknown-6", src: "/audio/Soundgarden/Superunknown/Head Down.mp3", title: "Head Down", artist: "Soundgarden", durationSec: 319 },
      { id: "sg-superunknown-7", src: "/audio/Soundgarden/Superunknown/Black Hole Sun.mp3", title: "Black Hole Sun", artist: "Soundgarden", durationSec: 164 },
      { id: "sg-superunknown-8", src: "/audio/Soundgarden/Superunknown/Spoonman.mp3", title: "Spoonman", artist: "Soundgarden", durationSec: 210 },
      { id: "sg-superunknown-9", src: "/audio/Soundgarden/Superunknown/Limo Wreck.mp3", title: "Limo Wreck", artist: "Soundgarden", durationSec: 299 },
      { id: "sg-superunknown-10", src: "/audio/Soundgarden/Superunknown/The Day I Tried To Live.mp3", title: "The Day I Tried To Live", artist: "Soundgarden", durationSec: 258 },
      { id: "sg-superunknown-11", src: "/audio/Soundgarden/Superunknown/Kickstand.mp3", title: "Kickstand", artist: "Soundgarden", durationSec: 546 },
      { id: "sg-superunknown-12", src: "/audio/Soundgarden/Superunknown/Fresh Tendrils.mp3", title: "Fresh Tendrils", artist: "Soundgarden", durationSec: 546 },
      { id: "sg-superunknown-13", src: "/audio/Soundgarden/Superunknown/4th Of July.mp3", title: "4th Of July", artist: "Soundgarden", durationSec: 546 },
      { id: "sg-superunknown-14", src: "/audio/Soundgarden/Superunknown/Half.mp3", title: "Half", artist: "Soundgarden", durationSec: 546 },
      { id: "sg-superunknown-15", src: "/audio/Soundgarden/Superunknown/Like Suicide.mp3", title: "Like Suicide", artist: "Soundgarden", durationSec: 546 },
      { id: "sg-superunknown-16", src: "/audio/Soundgarden/Superunknown/She Likes Surprises.mp3", title: "She Likes Surprises", artist: "Soundgarden", durationSec: 546 },
    ],
  },
];

function formatDuration(sec?: number): string {
  if (!sec) return "—:—";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface LibraryProps {
  query: string;
}

export default function Library({ query }: LibraryProps) {
  const currentTrackId = usePlayerStore((s) => s.currentTrack()?.id);
  const playQueue = usePlayerStore((s) => s.playQueue);

  // const totalTracks = MOCK_ALBUMS.reduce((sum, a) => sum + a.tracks.length, 0);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isCoverLoaded, setIsCoverLoaded] = useState(false);

  useEffect(() => {
    setSelectedAlbum(null);
    setIsCoverLoaded(false);
  }, [query]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredAlbums = MOCK_ALBUMS.filter((album) => {
    if (!normalizedQuery) return true;

    return (
      album.artist.toLowerCase().includes(normalizedQuery) ||
      album.title.toLowerCase().includes(normalizedQuery) ||
      album.tracks.some(
        (track) =>
          track.title.toLowerCase().includes(normalizedQuery) ||
          track.artist.toLowerCase().includes(normalizedQuery)
      )
    );
  });

  const filteredTracks = selectedAlbum?.tracks
    .map((track, originalIndex) => ({ track, originalIndex }))
    .filter(({ track }) => {
      if (!normalizedQuery) return true;

      return (
        track.title.toLowerCase().includes(normalizedQuery) ||
        track.artist.toLowerCase().includes(normalizedQuery)
      );
    }) ?? [];

  function selectAlbum(album: Album) {
    setSelectedAlbum(album);
    setIsCoverLoaded(false);
  }

  return (
    <div className="library">
      <div className="library__fav">
        <header className="library__header left">
          <h3 className="library__title">My library</h3>
        </header>

        <div className="library__fav__header">
          <span className="flex-40">&nbsp;</span>
          <span className="flex-1">Artist</span>
          <span className="flex-1">Album</span>
          <span className="flex-40">Time</span>
        </div>

        {filteredAlbums.map((album) => {
          const totalDurationSec = album.tracks.reduce(
            (sum, track) => sum + (track.durationSec ?? 0),
            0
          );

          const isSelected = album.id === selectedAlbum?.id;

          return (
            <section key={album.id} className={`library__fav__section ${isSelected ? "library__fav__section--active" : ""}`}
              onClick={() => selectAlbum(album)}>
              <div className="section">
                <div className="hover-btn">▶</div>
                <img src={album.cover} alt={`${album.artist} – ${album.title}`} width={30} className="flex-40" />
                <span className="flex-1">{album.artist}</span>
                <span className="flex-1">{album.title}</span>
                <span className="flex-40">{formatDuration(totalDurationSec)}</span>
              </div>
            </section>
          );
        })}
      </div>

      <div className="library__play">
        <header className="library__header">
          <p className="library__count">{selectedAlbum ? selectedAlbum.title + " / " : ""} {selectedAlbum ? filteredTracks.length : 0} tracks</p>
        </header>

        {!selectedAlbum && (
          <p className="library__empty">No album or song selected.</p>
        )}

        {selectedAlbum && (
          <section key={selectedAlbum.id} className="library__section library__section--enter">
            <div className={`cover__frame ${isCoverLoaded ? "" : "cover__frame--loading"}`}>
              <img
                src={selectedAlbum.cover}
                alt={`${selectedAlbum.artist} – ${selectedAlbum.title}`}
                width={260}
                className={`cover__img ${isCoverLoaded ? "cover__img--visible" : ""}`}
                onLoad={() => setIsCoverLoaded(true)}
              />
            </div>

            <ol className="tracklist">
              {filteredTracks.map(({ track, originalIndex }, i) => {
                const isActive = track.id === currentTrackId;
                return (
                  <li
                    key={track.id}
                    className={`tracklist__row tracklist__row--enter ${isActive ? "tracklist__row--active" : ""}`}
                    style={{ animationDelay: `${i * 30}ms` }}
                    onClick={() => playQueue(selectedAlbum.tracks, originalIndex)}
                  >
                    <span className="tracklist__index">{String(originalIndex + 1).padStart(2, "0")}</span>
                    <div className="tracklist__meta">
                      <span className="tracklist__title">{track.title}</span>
                      <span className="tracklist__artist">{track.artist}</span>
                    </div>
                    <span className="tracklist__duration">{formatDuration(track.durationSec)}</span>
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}
