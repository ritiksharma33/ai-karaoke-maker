from fastapi import FastAPI 
from routes.upload import router as upload_router
from fastapi.middleware.cors import CORSMiddleware




app=FastAPI()
origins=[
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",

]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(upload_router)
@app.get("/")
def home():
    return {'message':"ai-karaoke-maker backend is running"}