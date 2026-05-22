"user client"
import AudioPlayer from "react-h5-audio-player"
//if someone have the audiourl then only allow him 
interface props{
    audioUrl:string
}

export default function KaraokePlayer({audioUrl}:props){
    return (
        <div className="mt-6">
      <AudioPlayer src={audioUrl} />
    </div>
    )
    
}