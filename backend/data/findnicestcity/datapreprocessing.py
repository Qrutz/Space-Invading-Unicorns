
import numpy as np
import pandas as pd
from pathlib import Path

# Get the current working directory
current_path = Path.cwd()

# Correctly construct the path
datapath = current_path.parent / 'standardaized_data'


# Load the CSV files
# Vegetation density (0 to 100)

vegetation_density = pd.read_csv(datapath / 'vegetation_standardized.csv')
vegetation_density.rename(columns={'value':'Vegetation'}, inplace=True)
vegetation_density[vegetation_density['Vegetation']<0] = np.nan

# Population density (0.1 to 9000 people per square kilometer)
population_density = pd.read_csv(datapath / 'population_standardized.csv')
population_density.rename(columns={'value':'PopulationDensity'}, inplace=True)
population_density[population_density['PopulationDensity']<0.1] = np.nan
population_density[population_density['PopulationDensity']>9000] = np.nan

# Temperature (-50 to 50 Celsius)
temperature = pd.read_csv(datapath / 'Temperature_Float.csv')
temperature.rename(columns={'value':'Temperature'}, inplace=True)
temperature[temperature['Temperature']<-50] = np.nan
temperature[temperature['Temperature']>50] = np.nan


# Air pollution 
air_pollution = pd.read_csv(datapath / 'pollution_standardized.csv')
air_pollution.rename(columns={'value':'Pollution'}, inplace=True,)
air_pollution[air_pollution['Pollution']<0] = np.nan



##################
# Merge the data #
##################

# %%
merged_data = vegetation_density.merge(air_pollution, on=['longitude', 'latitude'],) \
                                .merge(population_density, on=['longitude', 'latitude'], ) \
                                .merge(temperature, on=['longitude', 'latitude'], ) \
                           
merged_data.dropna(inplace=True)

# %%

merged_data.to_csv('data.csv')
