import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Song from './player/playerObjects/song';
import Playlist from './player/playerObjects/playlist';
import {Player} from './player/MainPlayer';
import {MainContent} from './player/MainContent'
import {SearchMusic} from './player/Search'

function App() {
  // Feel free to remove test songs
  let test = new Song("radio", "", "http://streaming.tdiradio.com:8000/house.mp3");
  let test2 = new Song("radio2", "", "http://streaming.tdiradio.com:8000/house.mp3");
  let temp = new Playlist([test, test2]);
  let [playlist, setPlaylist] = useState(temp);

  let addSongToPlaylist = (song) => {
    setPlaylist(addSongToPlaylistDisplay(playlist, song));
  }

  // there is a playlist model object
  // 1. model 2. variable. updates a copy (a new object). 3. component
  // immutable. returns an object
  function addSongToPlaylistDisplay(playlist, song){
    // new playlist. copy
    let newPlaylist = Object.create(playlist);
    newPlaylist.newSong(song);
    return newPlaylist;
  }

  return (
    <div className="App">
      <SearchMusic addSongToPlaylist={addSongToPlaylist}/>
      <MainContent/>
      <Player type="Bottom-player" playlist={[playlist,setPlaylist]}/>
    </div>
  );
}

export default App;
