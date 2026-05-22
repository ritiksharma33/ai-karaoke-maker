"use client";

import AudioPlayer from "react-h5-audio-player";

interface Props {
  audioUrl: string;
}

export default function VocalPlayer({
  audioUrl
}: Props) {

  return (

    <div className="mt-6">

      <h2 className="font-bold mb-2">
        Vocals
      </h2>

      <AudioPlayer
        src={audioUrl}
      />

    </div>
  );
}