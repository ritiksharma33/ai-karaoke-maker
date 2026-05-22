from fastapi import APIRouter
from pydantic import BaseModel

from app.services.youtube_service import download_youtube_audio
from app.services.ffmpeg_service import convert_to_wav
from app.services.demucs_service import separate_audio
from app.services.whisper_service import transcribe_audio

router = APIRouter()

class YoutubeRequest(BaseModel):
    url: str

@router.post("/youtube")

async def process_youtube(
    request: YoutubeRequest
):

    # Download audio
    downloaded_file = download_youtube_audio(
        request.url
    )

    # Convert to WAV
    wav_path = convert_to_wav(
        downloaded_file
    )

    # Separate vocals
    separated = separate_audio(
        wav_path
    )

    if not separated:
        return {
            "error": "Separation failed"
        }

    # Extract lyrics
    transcription = transcribe_audio(
        separated["vocals"]
    )

    return {
        "lyrics": transcription["lyrics"],
        "segments": transcription["segments"],
        "instrumental": separated["instrumental"],
        "vocals": separated["vocals"]
    }