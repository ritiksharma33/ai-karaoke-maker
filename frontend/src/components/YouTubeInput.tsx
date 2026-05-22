"use client";

import { useState } from "react";
import api from "@/lib/api";

interface Props {
  onProcessed: (data: any) => void;
}

export default function YouTubeInput({
  onProcessed
}: Props) {

  const [url, setUrl] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleProcess = async () => {

    if (!url) return;

    setLoading(true);

    try {

      const res = await api.post(
        "/youtube",
        { url }
      );

      onProcessed(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="mt-8">

      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
        className="border p-2 w-full"
      />

      <button
        onClick={handleProcess}
        className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
      >
        {loading
          ? "Processing..."
          : "Fetch from YouTube"}
      </button>

    </div>
  );
}