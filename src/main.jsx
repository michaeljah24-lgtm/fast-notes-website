import React from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

function App(){
 return (
  <main>
   <header>
    <h1>Fast Notes</h1>
    <p>AEN Creative</p>
   </header>

   <section className="hero">
    <h2>Your colorful digital notebook</h2>
    <p>
      Create notes, organize ideas, sync devices,
      and keep everything secure.
    </p>
    <button>Download Fast Notes</button>
   </section>

   <section className="features">
    <article>📝 Rich Notes</article>
    <article>☁️ Cloud Sync</article>
    <article>🔒 App Lock</article>
    <article>🎙️ Voice Notes</article>
    <article>🔔 Reminders</article>
    <article>🌙 Dark Mode</article>
   </section>

   <footer>
    © AEN Creative - Fast Notes
   </footer>
  </main>
 )
}

createRoot(document.getElementById("root")).render(<App/>);
