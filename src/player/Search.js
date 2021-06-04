import React, { useState } from 'react';

function SearchMusic(props){
    // callback function to modify and add a song to parent's playlist state
    let addSongToPlaylist = props.addSongToPlaylist;
    // create a state for what user searches
    let [searchTerm, setSearchTerm] = useState("");
    // create a state for  the search result (list of songs)
    let [listOfPreSongs, setListOfPreSongs] = useState([]);
    var searchOnChange = (e) => {
      setSearchTerm(e.target.value);
    }
    var search = (e) => {
      if (e.keyCode === 13){
        // get 'presong objects' promise (search results)
        searchTermPromise(searchTerm)
          //set the list of songs (this leads to displaying the list of songs)
          .then(songs => setListOfPreSongs(songs));
      }
    }
    return (
      <div>
        <div className="Search-nav">
          <span className="Search-nav-span">{searchTerm === ""?"":("ENTER to search " + searchTerm)}</span>
          <input className="Search-bar" onChange={searchOnChange} onKeyDown={search} value={searchTerm} placeholder="Search"/>
        </div>
        <SearchMusicResult listOfPreSongs={listOfPreSongs} addSongToPlaylist={addSongToPlaylist} />
      </div>
    );
}

function SearchMusicResult(props){
    // callback function to modify and add a song to grandparent's playlist state
    let addSongToPlaylist = props.addSongToPlaylist;
    let listOfPreSongs = props.listOfPreSongs;
    return(
        <div className="Search-result">
        {listOfPreSongs.map((preSong, i) => <li className="Search-result-box" key={i} onClick={() => {downloadAndAddToPlaylist(addSongToPlaylist,preSong)}}>{preSong.name}</li>)}
        </div>
    )
}

function downloadAndAddToPlaylist(addSongToPlaylist,preSongObj){
    //get 'song object' promise
    downloadPromise(preSongObj)
    //add to playlist
    .then(song => addSongToPlaylist(song))
}
  
// returns a 'song object' promise from downlaod request
function downloadPromise(preSongObj){
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({query:`mutation ($preSong: PreSongInput!){
        addSong(song: $preSong){
            name
            originalLink
            contentLink
        }
        }`, variables: {preSong: preSongObj}
    })
    })
    .then(res => res.json())
    .then(resObj => resObj.data.addSong)
}
  
// returns a 'presongs objects' promise for search result
function searchTermPromise(searchTerm){
    //sends request and receives an array of presong objects
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        body: JSON.stringify({query: `query ($searchTerm: String!) {
        searchFive(searchTerm: $searchTerm) {
            name,
            originalLink 
            } 
        }`, variables: { searchTerm }
        })
    })
    .then(res => res.json())
    .then(resObj => resObj.data.searchFive)
}

export {SearchMusic}