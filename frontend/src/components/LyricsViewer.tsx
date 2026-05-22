interface props{
    lyrics:string
}
export default function LyricsViewer({lyrics,}:props){
    return(
        <div className="mt-6 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">
              lyrics
            </h2>
            <p className="whitespace-pre-wrap">
                {lyrics}
            </p>
        </div>
    )

}