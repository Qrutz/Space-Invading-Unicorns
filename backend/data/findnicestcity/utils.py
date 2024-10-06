import numpy as np
import pandas as pd
from pathlib import Path
#############
# functions #
#############


def calculateDataDistance(data, optimal):
    """
    Calculate the distance between the data value and the optimal value for the temperature criterion.
    
    Args:
        Data (1 x M list or array): A list or array of actual data values for each location.
        Optimal (1 x 1 list or array): A list or array of optimal values for the temperature criterion.
        
    Returns:
        distance (1 x M list or array): A list or array of distances between the data values and the optimal values.
    """
    
    minData = min(data)
    maxData = max(data)
    
    varData = np.var(data,axis=0)
    
    distance = np.abs(data - optimal)/(maxData - minData)
    return distance

def bestLocation(
    priorities,
    optimalValues,
    data,
):
    """
    Calculate the objective function to determine the best location based on given priorities, optimal values, and data values.
    
    N = number of criteria
    M = number of locations in database
    
    Args:
        priorities (1xN list or array): weight of each criterion in the decision-making process (each 0-4).
        optimalValues (1xN list or array): A list or array of optimal values for each criterion.
        data (N+2 x M list or array): A list or array of actual data values and coordinates for each location.
    Returns:
        bestLocation: The location that best meets the criteria based on the objective function.
    """
    # Calculate the objective function
    
    populationDensityIndex = 1
    
    noCriteria = len(priorities)
    
    coordinates = data[-2:]
    
    dataValues = data[:-2]
    
    objectiveFunction = np.zeros(len(dataValues[0]))
    
    for iFeature in range(noCriteria):
        featureData = dataValues[iFeature]
        featureOptimal = optimalValues[iFeature]
        priority = priorities[iFeature]
        objectiveFunction += priority * calculateDataDistance(featureData, featureOptimal)
        
    objectiveFunction /= sum(priorities)
    
    
    
    # Find the best location
    bestLocation = np.argmin(objectiveFunction)
    
    bestLocationCoordinates = [coordinates[0][bestLocation],coordinates[1][bestLocation]]
    bestLocationFeatures = [dataValues[i][bestLocation] for i in range(noCriteria)]
    
    # print("The best location is: ", bestLocationCoordinates)
    
    return bestLocationCoordinates, bestLocationFeatures