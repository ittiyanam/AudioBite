from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Rating(BaseModel):
    user: str
    score: int
    comment: Optional[str] = None

class Song(BaseModel):
    title: str
    artist: str
    spotify_url: str

class Dish(BaseModel):
    name: str
    restaurant: str
    rating: Rating  # single rating at creation
    song: Optional[Song] = None  # opt song

dishes = []

@app.get("/dishes")
def get_dishes():
    return dishes


@app.post("/dishes")
def add_dish(dish: Dish):
    dishes.append(dish)
    return {"message": "Dish added!", "dish": dish}
