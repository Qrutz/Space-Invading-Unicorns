from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from urllib.request import urlopen
import json

app = FastAPI()

class UserInput(BaseModel):
    temperature: int
    population: int
    treeCoverage: int

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/calculate")
def getUserParametersAndCalculate():
    userAnswer = getplace(57.721035, 12.939819)
    if userAnswer:
        town, country = userAnswer
        return {
            "City": town,
            "Country": country,
        }
    else:
        return {"error": "Location not found"}


def getplace(lat, lon):
    url = f"http://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lon}&sensor=false&key=AIzaSyCERxB4t2EdfYMF_U2h-NcAd40BoP4NTpI"
    try:
        v = urlopen(url).read()
        j = json.loads(v)
        components = j['results'][0]['formatted_address']
        country = town = None
        print("Hello")
        for c in components:
            if "country" in c['types']:
                print("Hello")
                country = c['long_name']
            if "postal_town" in c['types']:
                print("Yellow")
                town = c['long_name']
        return town, country
    except Exception as e:
        print(f"Error occurred: {e}")
        return None
