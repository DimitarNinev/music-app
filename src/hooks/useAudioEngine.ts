import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";

/**
 * Държи един-единствен <audio> елемент в живота на приложението и го
 * синхронизира двупосочно с Zustand store-а. Монтира се веднъж в App.
 */
export function useAudioEngine() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = usePlayerStore((s) => s.currentTrack());
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const volume = usePlayerStore((s) => s.volume);
  const setProgress = usePlayerStore((s) => s.setProgress);
  const seekRequest = usePlayerStore((s) => s.seekRequest);
  const next = usePlayerStore((s) => s.next);

  if (!audioRef.current) {
    audioRef.current = new Audio();
  }

  // смяна на песента
  useEffect(() => {
    const audio = audioRef.current!;
    if (track && audio.src !== track.src) {
      audio.src = track.src;
      audio.load();
      if (isPlaying) audio.play().catch(() => {});
    }
    if (!track) {
      audio.pause();
      audio.removeAttribute("src");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.id]);

  // play/pause
  useEffect(() => {
    const audio = audioRef.current!;
    if (!track) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying, track]);

  // volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // progress + auto-advance
  useEffect(() => {
    const audio = audioRef.current!;
    const onTime = () => setProgress(audio.currentTime, audio.duration || 0);
    const onEnded = () => next();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [setProgress, next]);

  // Seek requests come from the player UI; keeping the Audio instance here
  // ensures the displayed progress and actual playback position stay in sync.
  useEffect(() => {
    if (!seekRequest) return;

    const audio = audioRef.current!;
    const duration = audio.duration;
    audio.currentTime = Number.isFinite(duration)
      ? Math.min(seekRequest.position, duration)
      : seekRequest.position;
    setProgress(audio.currentTime, duration || 0);
  }, [seekRequest, setProgress]);
}
