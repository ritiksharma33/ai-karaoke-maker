from fastapi import APIRouter, UploadFile, File
import os

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

    return {
        "filename": file.filename,
        "message": "Upload successful"
    }