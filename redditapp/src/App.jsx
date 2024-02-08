import React from 'react';
import './App.css';
import Home from './features/Home/Home';
import Header from './features/Header/Header';
import Subreddits from './features/Subreddits/Subreddits';


function App() {
  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Kanit&family=Prompt&family=Space+Mono&display=swap" rel="stylesheet"></link>
      <Header/>
      <main>
        <Home />
      </main>
      <aside>
        <Subreddits/>
      </aside>

    </>
  );
}

export default App;
