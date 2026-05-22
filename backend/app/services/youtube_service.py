import yt_dlp
import os

DOWNLOAD_DIR = "app/uploads"

def download_youtube_audio(url):

    os.makedirs(DOWNLOAD_DIR, exist_ok=True)

    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": f"{DOWNLOAD_DIR}/%(title)s.%(ext)s",
        "quiet": False
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:

        info = ydl.extract_info(url, download=True)

        file_path = ydl.prepare_filename(info)

    return file_path