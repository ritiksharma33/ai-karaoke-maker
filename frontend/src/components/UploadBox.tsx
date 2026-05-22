"use client";

import { useState } from "react";

import api from "@/lib/api";

import KaraokePlayer from "./KaraokePlayer";
import LyricsViewer from "./LyricsViewer";

export default function UploadBox() {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [lyrics, setLyrics] =
    useState("");

  const [instrumental, setInstrumental] =
    useState("");

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

      setLyrics(res.data.lyrics);

      const audioUrl =
        "http://127.0.0.1:8000/" +
        res.data.instrumental;

      setInstrumental(audioUrl);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-3xl font-bold">
        AI Karaoke Maker
      </h1>

      <input
        type="file"
        className="mt-6"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button
        onClick={handleUpload}
        className="bg-black text-white px-6 py-2 mt-4 rounded"
      >
        {loading
          ? "Processing..."
          : "Generate Karaoke"}
      </button>

      {instrumental && (
        <KaraokePlayer
          audioUrl={instrumental}
        />
      )}

      {lyrics && (
        <LyricsViewer
          lyrics={lyrics}
        />
      )}

    </div>
  );
}