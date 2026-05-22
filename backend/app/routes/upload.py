from fastapi import APIRouter, UploadFile, File
import os
from app.services.ffmpeg_service import convert_to_wav   # Add 'app.' prefix
from app.services.demucs_service import separate_audio   # Add 'app.' prefix
from app.services.whisper_service import transcribe_audio
router = APIRouter()

# 1. Get the directory where this current file lives (backend/app/routes/)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# 2. Go up one level to 'app' and look for or create an 'uploads' directory
# This translates perfectly to: backend/app/uploads/
UPLOAD_DIR = os.path.join(CURRENT_DIR, "..", "uploads")

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    
    # 3. CRUCIAL: Make sure the folder exists before writing to it!
    # If the 'uploads' folder isn't there, Python will create it right now.
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # 4. Safely construct the absolute file path
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    wav_path=convert_to_wav(file_path)
    seperated=separate_audio(wav_path)
    transcription=transcribe_audio(seperated['vocals'])

    return {
        "message": "Processing successful",
        "lyrics":transcription['lyrics'],
        "segments":transcription['segments'],
        "instrumental":seperated['instrumental'],
        "vocals":seperated['vocals']
    }