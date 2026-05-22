import subprocess
import os
#this is for converting the uploaded file to wav format using ffmpeg 
def convert_to_wav(input_path):
    #this is slippitn gat frist dot and adding list 0 eelemt with .wav
    output_path=input_path.rsplit('.',1)[0]+'.wav'
    command = [
        'ffmpeg', 
        '-ss', '30', 
        '-i', input_path, 
        '-t', '60', 
        output_path
    ]
    subprocess.run(command,check=True)
    return output_path