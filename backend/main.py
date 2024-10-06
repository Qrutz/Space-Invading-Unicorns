from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

class UserInput(BaseModel):
    temperature: int
    temperaturePriority: int
    population: int
    populationPriority: int
    treeCoverage: int
    treeCoveragePriority: int
    polutionLevels: int
    polutionLevelsPriority: int


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/calculate")
def getUserParametersAndCalculate(userInput: UserInput):
    # Do ML model algo thingy

    print(userInput)

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
    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lon}&sensor=false&key=AIzaSyCERxB4t2EdfYMF_U2h-NcAd40BoP4NTpI"
    try:
        # Make the request
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Ensure the response contains results
        if not data.get('results'):
            print(f"No results found for coordinates: {lat}, {lon}")
            return None

        # Extract address components
        components = data['results'][0]['address_components']
        country = town = None

        # Iterate over components to find country and town
        for c in components:
            if "country" in c['types']:
                country = c['long_name']
            if "locality" in c['types'] or "postal_town" in c['types']:
                town = c['long_name']

        return town, country

    except requests.RequestException as e:
        print(f"Request failed: {e}")
    except (IndexError, KeyError) as e:
        print(f"Error extracting data: {e}")

    return None
