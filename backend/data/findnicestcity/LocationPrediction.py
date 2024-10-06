# %%
import numpy as np
import pandas as pd
from pathlib import Path
from utils import bestLocation, calculateDataDistance





######################
# Input from website #
######################
#Order: Temperature, Vegetation, Population Density, Air Pollution

priorities = [1, 1, 1,1]

optimalValues = np.array([10,800, 800, 10])  
# print("Priorities:", priorities)
# print("Optimal Values:", optimalValues)
# print("Data (N+2 x M):\n", data)


#################
# Load the data #
#################


merged_data = pd.read_csv('data.csv')
# Combining all data into a single array (N+2 x M)
vegetation_density = merged_data['Vegetation'].to_numpy()
population_density = merged_data['PopulationDensity'].to_numpy()
temperature = merged_data['Temperature'].to_numpy()
air_pollution = merged_data['Pollution'].to_numpy()

# Coordinates for each location (latitude and longitude)
latitude = merged_data['latitude'].to_numpy()
longitude = merged_data['longitude'].to_numpy()

data = np.array([temperature,vegetation_density, population_density,  air_pollution, latitude, longitude])

#################	
# Run the model #
#################
coordinates,features  = bestLocation(
    priorities,
    optimalValues,
    data,)


# print("The best location is: ", coordinates)
# print("The features of the best location are: ", features)

