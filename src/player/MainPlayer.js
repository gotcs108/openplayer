import React, { useEffect, useState, useRef } from 'react';
import { AudioPlayerHOC } from './AudioPlayer'
import { PlaylistDisplay } from './PlaylistDisplay'

function Player(props){
  let [playing, setPlaying] = useState(false);
  let player = useRef(null);
  let [pauseButton, setPauseButton] = useState('Resume');
  let [playlist,setPlaylist] = props.playlist;
  //loading for the HOC in the parent component
  let [loading, setLoading] = useState(true)

  // callback to set ref on player
  let setRef = (ref) => {player.current = ref}

  // setPlaerSrc using playlist
  let setPlayerSrc = (song) => {
    let tempPlaylist = Object.create(playlist)
    tempPlaylist.setSong(song)
    player.current.src=tempPlaylist.currentSong.contentLink
    setPlaylist(tempPlaylist)
    setLoading(true)
    pauseKeep()
  }

  // previous song button
  let prev = () => {
    if (player.current.currentTime === 0){
      // set the previous song as the current song
      setPlayerSrc(playlist.previous());
    }
    else{
      player.current.currentTime = 0;
    }
  }

  // pause song button
  let pause = () => {
    // if the playlist has a current song
    if (playlist.currentSong){
      pauseToggle()
    }
    // if 'current song' is null, set it to the first song on the playlist. Empty playlist sets it to null.
    else{
      let tempCurrentSong = playlist.reset()
      if (tempCurrentSong){
        setPlayerSrc(tempCurrentSong)
        pauseToggle()
      }
    }
  }

  // toggle feature for the pause button
  let pauseToggle = () => {
    if (playing && !player.current.paused){
      setPlaying(false)
      setPauseButton('Resume');
      player.current.pause()
    }
    else if (!playing && player.current.paused){
      setPlaying(true)
      setPauseButton('Pause');
      player.current.play().catch(e=>{})
    }
  }

  // keep pause button state
  let pauseKeep = () => {
    if (playing){
      player.current.play().catch(e=>{console.log(e)})
    }
    else
    {
      player.current.pause()
    }
  }

  // next song button
  let next = () => {
    setPlayerSrc(playlist.next());
  }

  return (
    <div>
      <div className={props.type}>
        <div className="Player-bottom-container">
          <div className="Player-buttons-container">
            <button className="Player-buttons" onClick={prev}>Start</button>
            <button className="Player-buttons" onClick={pause}>{loading&&playing?"Loading":pauseButton}</button>
            <button className="Player-buttons" onClick={next}>Next</button>
          </div>
          <PlaylistDisplay playlist={playlist} setSongSrcCallBack={setPlayerSrc}/>
        </div>
      <AudioPlayerHOC setRef={setRef} loading={loading} setLoading={setLoading}/>
      </div>
    </div>
  );
}


export { Player };