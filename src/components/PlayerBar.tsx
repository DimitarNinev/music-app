import { useRef } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";

function formatTime(sec: number): string {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlayerBar() {
  const track = usePlayerStore((s) => s.currentTrack());
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const positionSec = usePlayerStore((s) => s.positionSec);
  const durationSec = usePlayerStore((s) => s.durationSec);
  const seekTo = usePlayerStore((s) => s.seekTo);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const next = usePlayerStore((s) => s.next);
  const previous = usePlayerStore((s) => s.previous);
  const volume = usePlayerStore((s) => s.volume);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const lastVolumeRef = useRef(1);

  const toggleMute = () => {
    if (volume > 0) {
      lastVolumeRef.current = volume;
      setVolume(0);
    } else {
      setVolume(lastVolumeRef.current || 1);
    }
  };

  const volumeIcon = volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊";

  if (!track) {
    return (
      <div className="player player--empty">
        <span>Select a song to start the player.</span>
      </div>
    );
  }

  const progressPct = durationSec ? Math.min(100, Math.max(0, (positionSec / durationSec) * 100)) : 0;

  return (
    <div className="player">
      <div className="player__meta">
        <span className="player__title">{track.title}</span>
        <span className="player__artist">{track.artist}</span>
      </div>

      <div className="player__controls">
        <div className="player__btns">
          <button className="player__btn" onClick={previous} aria-label="Предишна песен">‹‹</button>
          <button className="player__btn player__btn--play" onClick={togglePlay} aria-label={isPlaying ? "Пауза" : "Пусни"}>
            {isPlaying ? "II" : "▶"}
          </button>
          <button className="player__btn" onClick={next} aria-label="Следваща песен">››</button>
        </div>

        <div className="player__progress">
          <span className="player__time">{formatTime(positionSec)}</span>
          <input
            type="range"
            min={0}
            max={durationSec || 0}
            step={0.1}
            value={Math.min(positionSec, durationSec || 0)}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="player__progress-slider"
            aria-label="Позиция в песента"
            disabled={!durationSec}
            style={{ background: `linear-gradient(to right, var(--amber) ${progressPct}%, var(--line) ${progressPct}%)` }}
          />
          <span className="player__time">{formatTime(durationSec)}</span>
        </div>
      </div>

      <div className="player__volume">
        <button className="player__btn" onClick={toggleMute} aria-label={volume === 0 ? "Включи звука" : "Заглуши"}>
          {volumeIcon}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="player__volume-slider"
          aria-label="Сила на звука"
        />
      </div>
    </div>
  );
}
