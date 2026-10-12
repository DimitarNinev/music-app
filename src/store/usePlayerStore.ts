import { create } from "zustand";
import { Track } from "@/types";

interface PlayerStore {
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  positionSec: number;
  durationSec: number;
  seekRequest: { position: number; id: number } | null;
  volume: number;

  currentTrack: () => Track | null;
  playQueue: (tracks: Track[], startIndex?: number) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  next: () => void;
  previous: () => void;
  setProgress: (position: number, duration: number) => void;
  seekTo: (position: number) => void;
  setVolume: (v: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  positionSec: 0,
  durationSec: 0,
  seekRequest: null,
  volume: 1,

  currentTrack: () => {
    const { queue, currentIndex } = get();
    return queue[currentIndex] ?? null;
  },

  playQueue: (tracks, startIndex = 0) =>
    set({ queue: tracks, currentIndex: startIndex, isPlaying: true, positionSec: 0 }),

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  next: () =>
    set((s) => {
      if (s.currentIndex < s.queue.length - 1) {
        return { currentIndex: s.currentIndex + 1, positionSec: 0, isPlaying: true };
      }
      return { isPlaying: false };
    }),

  previous: () =>
    set((s) => {
      if (s.currentIndex > 0) {
        return { currentIndex: s.currentIndex - 1, positionSec: 0, isPlaying: true };
      }
      return s;
    }),

  setProgress: (position, duration) => set({ positionSec: position, durationSec: duration }),
  seekTo: (position) =>
    set((s) => ({
      positionSec: position,
      seekRequest: { position, id: (s.seekRequest?.id ?? 0) + 1 },
    })),
  setVolume: (v) => set({ volume: v }),
}));
