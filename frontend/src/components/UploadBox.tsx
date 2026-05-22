"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function UploadBox() {

  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/upload", formData);

    alert("Uploaded!");
    console.log(res.data);
  };

  return (
    <div className="p-10">
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button
        onClick={handleUpload}
        className="bg-black text-white px-4 py-2 mt-4"
      >
        Upload
      </button>
    </div>
  );
}