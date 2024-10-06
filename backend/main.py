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
    longitude, latitude = 57.721035, 12.939819

    # Request to Google Maps API to get country and city
    print(userInput)
    userAnswer = getplace(longitude, latitude)
    userAnswer2 = getplace2(longitude, latitude)
    userAnswer3 = getplace3(longitude, latitude)

    # Check if all responses are valid
    if userAnswer and userAnswer2 and userAnswer3:
        # Unpack the results
        town, country = userAnswer
        town2, country2 = userAnswer2
        town3, country3 = userAnswer3
        return {
            "City": town,
            "Country": country,
            "City2": town2,
            "Country2": country2,
            "City3": town3,
            "Country3": country3,
            "Latitude": latitude,
            "Longitude": longitude,
        }
    else:
        return {"error": "Location not found"}


def getplace3(lat, lon):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lon}&sensor=false&key=AIzaSyCERxB4t2EdfYMF_U2h-NcAd40BoP4NTpI"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if not data.get("results"):
            print(f"No results found for coordinates: {lat}, {lon}")
            return None

        components = data["results"][0]["address_components"]
        country = town = None

        for c in components:
            if "country" in c["types"]:
                country = c["long_name"]
            if "locality" in c["types"] or "postal_town" in c["types"]:
                town = c["long_name"]

        return town, country

    except requests.RequestException as e:
        print(f"Request failed: {e}")
    except (IndexError, KeyError) as e:
        print(f"Error extracting data: {e}")

    return None


def getplace2(lat, lon):

    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lon}&sensor=false&key=AIzaSyCERxB4t2EdfYMF_U2h-NcAd40BoP4NTpI"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if not data.get("results"):
            print(f"No results found for coordinates: {lat}, {lon}")
            return None

        components = data["results"][0]["address_components"]
        country = town = None

        for c in components:
            if "country" in c["types"]:
                country = c["long_name"]
            if "locality" in c["types"] or "postal_town" in c["types"]:
                town = c["long_name"]

        return town, country

    except requests.RequestException as e:
        print(f"Request failed: {e}")
    except (IndexError, KeyError) as e:
        print(f"Error extracting data: {e}")

    return None


def getplace(lat, lon):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lon}&sensor=false&key=AIzaSyCERxB4t2EdfYMF_U2h-NcAd40BoP4NTpI"
    try:
        # Make the request
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Ensure the response contains results
        if not data.get("results"):
            print(f"No results found for coordinates: {lat}, {lon}")
            return None

        # Extract address components
        components = data["results"][0]["address_components"]
        country = town = None

        # Iterate over components to find country and town
        for c in components:
            if "country" in c["types"]:
                country = c["long_name"]
            if "locality" in c["types"] or "postal_town" in c["types"]:
                town = c["long_name"]

        return town, country

    except requests.RequestException as e:
        print(f"Request failed: {e}")
    except (IndexError, KeyError) as e:
        print(f"Error extracting data: {e}")

    return None
