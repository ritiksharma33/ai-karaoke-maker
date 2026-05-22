import whisper

model= whisper.load_model("base")

def transcribe_audio(file_path):
    result=model.transcribe(file_path)
    lyrics=result['text']
    segments=result['segments']
    return{
        "lyrics":lyrics,
        "segments":segments
    }