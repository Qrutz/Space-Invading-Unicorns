import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "../components/Banner";
import img from "../assets/spaceinvadingunicorns.png";
import { FilterComponent } from "./Filter";
import axios from "axios";

// Simulated API response function
function simulateApiResponse(data) {
    console.log("Form submitted with data: ", data);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                country: "Sweden",
                coordinates: {
                    lat: 57.7089,
                    lng: 11.9746,
                },
            });
        }, 2000);
    });
}

export function LandingPage({ setResponse }) {
    const [temperature, setTemperature] = useState(10);
    const [temperaturePriority, setTemperaturePriority] = useState(1);
    const [pollution, setPollution] = useState(50);
    const [pollutionPriority, setPollutionPriority] = useState(1);
    const [population, setPopulation] = useState(50);
    const [populationPriority, setPopulationPriority] = useState(1);
    const [treeCoverage, setTreeCoverage] = useState(50);
    const [treeCoveragePriority, setTreeCoveragePriority] = useState(1);
    const [loading, setLoading] = useState(false);


    const handleFormSubmit = async () => {
        const formData = {
            temperature: Math.round(temperature),
            temperaturePriority: Math.round(temperaturePriority),
            polutionLevels: Math.round(pollution),
            polutionLevelsPriority: Math.round(pollutionPriority),
            population: Math.round(population),
            populationPriority: Math.round(populationPriority),
            treeCoverage: Math.round(treeCoverage),
            treeCoveragePriority: Math.round(treeCoveragePriority),
        };


        console.log(formData);

        setLoading(true);

        const apiResponse = await axios.post('/api/calculate', formData);
        console.log(apiResponse);
        const coordinates = {
            lat: apiResponse.data.Longitude,
            lng: apiResponse.data.Latitude,
            treeCoverage: apiResponse.data.TreeCoverage,
            population: apiResponse.data.Population,
            pollution: apiResponse.data.Pollution, // Scale down pollution value
            temperature: apiResponse.data.Temperature,
            country: apiResponse.data.Country,
        };

        setResponse({ coordinates });

        setLoading(false);
    };



    return (
        <BackgroundBeamsWithCollision>
            <div className="flex flex-col items-center justify-center h-screen space-y-6 px-4 font-Fred">
                <img src={img} alt="Space Invading Unicorns" className="w-32 h-32 rounded-full md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto" />
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-white font-pixel">
                    What is the most suitable <br /> country for you to live in?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-center text-gray-400">
                    Add your preferences and find out!
                </p>

                <div className="flex flex-wrap justify-center gap-2 py-10 w-full">
                    <FilterComponent
                        title="Temperature"
                        minLabel="-12C"
                        maxLabel="45C"
                        minRange={-12}
                        maxRange={45}
                        initialRange={temperature}
                        onRangeChange={setTemperature}
                        onPriorityChange={setTemperaturePriority}
                    />
                    <FilterComponent
                        title="Pollution"
                        minLabel="Low"
                        maxLabel="High"
                        minRange={1.3}
                        maxRange={133}
                        initialRange={pollution}
                        onRangeChange={setPollution}
                        onPriorityChange={setPollutionPriority}
                    />
                    <FilterComponent
                        title="Population Density"
                        minLabel="0.1"
                        maxLabel="8987 mil"
                        minRange={0.1}
                        maxRange={8987}
                        initialRange={population}
                        onRangeChange={setPopulation}
                        onPriorityChange={setPopulationPriority}
                    />
                    <FilterComponent
                        title="Tree Coverage"
                        minLabel="0 %"
                        maxLabel="100 %"
                        minRange={1}
                        maxRange={97}
                        initialRange={treeCoverage}
                        onRangeChange={setTreeCoverage}
                        onPriorityChange={setTreeCoveragePriority}
                    />                </div>

                <button
                    className="bg-purple-700 text-white py-2 px-6 rounded-full text-lg shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={handleFormSubmit}
                    disabled={loading}
                >
                    {loading ? "Searching..." : "Find a place!"}
                </button>
            </div>
        </BackgroundBeamsWithCollision>
    );
}
