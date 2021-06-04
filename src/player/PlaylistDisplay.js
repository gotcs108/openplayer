import React from 'react';

function PlaylistDisplay(props){
    let playlist = props.playlist;
    let setSongSrc = props.setSongSrcCallBack;
    let boldFace = (song) => {
      if (playlist.currentSongCompare(song)){
        return (<b>{song.name}</b>);
      }
      else{
        return (song.name);
      }
    }
    return(
      <div className="Playlist-display">
        <p>Playlist</p>
        <ul>
        {playlist.songs.map((song, i) => {
          return(
          // <li onClick={() => {setSongSrc(playlist.setSong(song)); props.pauseKeep()}}>
          <li key={i} onClick={() => {setSongSrc(playlist.setSong(song))}}>
            {boldFace(song)}
          </li>
          )
        })}
        </ul>
        
      </div>
    );
}
export { PlaylistDisplay }