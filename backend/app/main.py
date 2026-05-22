import os

from fastapi import FastAPI 
from app.routes.upload import router as upload_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.youtube import router as youtube_router

app=FastAPI()
os.makedirs("separated", exist_ok=True)
origins=[
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",

]
app.include_router(youtube_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount(
    "/separated",
    StaticFiles(directory="separated"),
    name="separated"

)
app.include_router(upload_router)
@app.get("/")
def home():
    return {'message':"ai-karaoke-maker backend is running"}