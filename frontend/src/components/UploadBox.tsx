"use client";

import { useState } from "react";

import api from "@/lib/api";

import KaraokePlayer from "./KaraokePlayer";
import VocalPlayer from "./VocalPlayer";
import LyricsViewer from "./LyricsViewer";
import YouTubeInput from "./YouTubeInput";

export default function UploadBox() {

  const [file, setFile] =
    useState<File | null>(null);

  const [lyrics, setLyrics] =
    useState("");

  const [instrumental, setInstrumental] =
    useState("");

  const [vocals, setVocals] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const processResult = (data: any) => {

    setLyrics(data.lyrics);

    setInstrumental(
      "http://127.0.0.1:8000/" +
      data.instrumental
    );

    setVocals(
      "http://127.0.0.1:8000/" +
      data.vocals
    );
  };

  const handleUpload = async () => {

    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {

      const res = await api.post(
        "/upload",
        formData
      );

      processResult(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-4xl font-bold">
        AI Karaoke Maker
      </h1>

      {/* File Upload */}

      <div className="mt-8">

        <input
          type="file"
          onChange={(e) => {

            if (e.target.files) {

              setFile(
                e.target.files[0]
              );
            }
          }}
        />

        <button
          onClick={handleUpload}
          className="bg-black text-white px-6 py-2 mt-4 rounded"
        >
          {loading
            ? "Processing..."
            : "Upload Audio"}
        </button>

      </div>

      {/* YouTube */}

      <YouTubeInput
        onProcessed={processResult}
      />

      {/* Instrumental */}

      {instrumental && (

        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            Instrumental
          </h2>

          <KaraokePlayer
            audioUrl={instrumental}
          />

        </div>
      )}

      {/* Vocals */}

      {vocals && (

        <VocalPlayer
          audioUrl={vocals}
        />
      )}

      {/* Lyrics */}

      {lyrics && (

        <LyricsViewer
          lyrics={lyrics}
        />
      )}

    </div>
  );
}