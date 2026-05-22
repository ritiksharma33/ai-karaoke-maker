import subprocess
import os

OUTPUT_DIR = 'app/outputs'

def separate_audio(file_path):
    command =['demucs','--two-stems=vocals',file_path] 
    subprocess.run(command,check=True)
    filename=os.path.splitext(os.path.basename(file_path))[0]
    instrumental_path = (
        f"separated/htdemucs/{filename}/no_vocals.wav"
    )
    vocals_path = (
        f"separated/htdemucs/{filename}/vocals.wav"
    )
    return {
        "instrumental":instrumental_path,
        "vocals":vocals_path
    }