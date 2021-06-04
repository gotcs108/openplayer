//Song object has name, originalLink, contentLink
function Song(name, originalLink, contentLink){
    this.name = name;
    this.originalLink = originalLink;
    this.contentLink = contentLink;
}
Song.prototype = {
    // compare equality
    equal(otherSong){
        if (this.name === otherSong.name && this.originalLink === otherSong.originalLink && this.contentLink === otherSong.contentLink){
            return true
        }
        else{
            return false
        }
    }
}
export default Song;