# Music Web — стартов проект

Vite + React 19 + TypeScript + Zustand. Уеб музикално приложение с
истински HTML5 `<audio>` плейбек (без external streaming зависимости).

## Инсталация и стартиране

```bash
cd music-web
npm install
npm run dev
```

Отваря се на `http://localhost:5173`.

## Структура

```
src/
  screens/Library.tsx     — списък с песни (tracklist)
  components/PlayerBar.tsx — долен фиксиран плейър
  hooks/useAudioEngine.ts  — синхронизира <audio> елемента със store-а
  store/usePlayerStore.ts  — Zustand state (queue, isPlaying, progress)
  types/index.ts           — Track, Playlist интерфейси
  styles/                  — global.css (токени) + app.css (компоненти)
```

## Следващи стъпки

1. **Замести MOCK_TRACKS** в `Library.tsx` с реални данни — качени
   файлове, backend API, или public/audio/ папка за локален тест.
2. **Upload на музика** — ще ти трябва backend (Node.js/Express,
   Supabase Storage и т.н.), ако потребителите качват собствени файлове.
3. **Обложки на албуми** — добави `artwork` полето към Track и покажи
   `<img>` в PlayerBar/tracklist.
4. **Плейлисти** — Playlist типът вече е дефиниран в `types/index.ts`,
   остава UI + persist логика (localStorage за старт, после backend).
5. **Deploy** — Vercel или Netlify, директно от този repo, minutes to live.

## Дизайн

Палитра и типография са в `src/styles/global.css` (CSS custom
properties) — лесно се преоцветява/премаркира от едно място.
