import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import requests

from data.findnicestcity.utils import bestLocation

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

    print(userInput)
    # Do ML model algo thingy
    userData = [userInput.temperature, userInput.treeCoverage, userInput.population, userInput.polutionLevels]
    userPriorities = [userInput.temperaturePriority, userInput.treeCoveragePriority, userInput.populationPriority, userInput.polutionLevelsPriority]


    # print(userData)
    # print(userPriorities)

    merged_data = pd.read_csv('data/findnicestcity/data.csv')

    print(merged_data.head())
    # Combining all data into a single array (N+2 x M)
    vegetation_density = merged_data['Vegetation'].to_numpy()
    population_density = merged_data['PopulationDensity'].to_numpy()
    temperature = merged_data['Temperature'].to_numpy()
    air_pollution = merged_data['Pollution'].to_numpy()
    # Coordinates for each location (latitude and longitude)
    latitude = merged_data['latitude'].to_numpy()
    longitude = merged_data['longitude'].to_numpy()

    data = np.array([temperature, vegetation_density, population_density, air_pollution, latitude, longitude])

    foundCoordinates, foundFeatures = bestLocation(userPriorities, userData, data)

    # Hardcoded data for example
    longitude, latitude = foundCoordinates
    temperature, treeCoverage, population, pollution = foundFeatures


    # Request to Google Maps API to get country and city
    print(userInput)
    userAnswer = getplace(longitude, latitude)
    if userAnswer:
        town, country = userAnswer
        return {
            "City": town,
            "Country": country,
            "Latitude": latitude,
            "Longitude": longitude,
            "TreeCoverage": treeCoverage,
            "Population": population,
            "Temperature": temperature,
            "Pollution": pollution
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
