import SearchBar from "@/components/SearchBar";
import Library from "@/screens/Library";
import PlayerBar from "@/components/PlayerBar";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import "@/styles/global.css";
import "@/styles/app.scss";
import { useState } from "react";

export default function App() {
  useAudioEngine();
  const [query, setQuery] = useState("");

  return (
    <div className="app">
      <SearchBar value={query} onChange={setQuery} placeholder="Search..." icon={true} />
      <main className="app__main">
        <Library query={query} />
      </main>
      <PlayerBar />
    </div>
  );
}
