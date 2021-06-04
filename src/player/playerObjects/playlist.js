//have to use this with constructor function
function Playlist(songs, currentSong=null, currentIndex=null){
    this._songs = songs;
    this._currentSong = currentSong;
    this._currentIndex = currentIndex;
    //songs array
}
Playlist.prototype = 
{
    get currentIndex(){
        return this._currentIndex;
    },
    set currentIndex(index){
        this._currentIndex = index;
    },
    get currentSong(){
        return this._currentSong;
    },
    set currentSong(song){
        this._currentSong = song;
    },
    get songs(){
        return this._songs;
    },
    previous(){
        let currentIndex = this.currentIndex;
        let songsSize = this.songs.length;
        //negative index goes to the back of the list + modulo (cycle)
        this.currentSong = this.songs[(songsSize + currentIndex - 1)%songsSize];
        return this.currentSong;
    },
    next(){
        let currentIndex = this.currentIndex;
        let songsSize = this.songs.length;
        //negative index goes to the back of the list + modulo (cycle)
        this.currentSong = this.songs[(songsSize + currentIndex + 1)%songsSize];
        return this.currentSong;
    },
    setSong(song){
        //check if the song exists in the playlist and set the current song's index
        let index = this.songs.findIndex((tempSong) => tempSong===song);
        if(index!==-1){
            this.currentIndex = index;
            this.currentSong = song;
            return this.currentSong;
        }
        //if it doesn't exist throw an error
        else{
            throw new Error("Given song doesn't exist in the playlist.")
        }
    },
    // Return 'current' song and if 'current' song is not set, return the first song. 
    // If the playlist is empty, return null.
    reset(){
        if(!this.currentSong && this.songs[0]){
            this.currentSong = this.songs[0];
        }
        else{
            return null;
        }
        return this.currentSong;
    },
    //check if this is the current song
    currentSongCompare(song){
        return this.currentSong === song;
    },
    newSong(song){
        this.currentIndex++;
        this._songs.push(song);
    },
    removeSongName(givenSong){
        let index = this._songs.findIndex(song => song.name === givenSong.name)
        if (index !== -1){
            this.currentIndex++;
            this._songs.splice(index,1);
        }
    }
}
export default Playlist