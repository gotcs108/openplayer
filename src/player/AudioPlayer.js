import React, { useRef } from 'react';
// HOC
function AudioPlayerHOC(props){
    let endLoading = () => {props.setLoading(false)}
    return(
      <div>
        {/* Loading: {props.loading? "yes" : "no"} */}
        <div>
        <AudioPlayer setRef={props.setRef} endLoading={endLoading}/>  
      </div>
      </div>
    )
}
let AudioPlayer = React.memo((props) => {
    let audioRef = useRef(null);
    let setRefWrapper = (ref) => {props.setRef(ref); audioRef.current = ref;}
    return(
      <div className="Timeline">
          {/* <audio ref={setRefWrapper} onLoadedData={()=>props.endLoading()} controls crossOrigin="anonymous"> */}
          <audio ref={setRefWrapper} onLoadedData={()=>props.endLoading()} crossOrigin="anonymous">
          </audio>
      </div>
    )
})
export { AudioPlayerHOC }