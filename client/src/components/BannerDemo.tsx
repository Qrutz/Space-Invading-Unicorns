import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "../components/Banner";
import img from "../assets/spaceinvadingunicorns.png";
import { FilterComponent } from "./Filter";

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
    const [temperature, setTemperature] = useState(50);
    const [pollution, setPollution] = useState(50);
    const [population, setPopulation] = useState(50);
    const [treeCoverage, setTreeCoverage] = useState(50);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async () => {
        const formData = {
            temperature,
            pollution,
            population,
            treeCoverage,
        };

        setLoading(true);
        const apiResponse = await simulateApiResponse(formData);
        setResponse(apiResponse); // Set the response in the parent via prop
        setLoading(false);
    };

    return (
        <BackgroundBeamsWithCollision>
            <div className="flex flex-col items-center justify-center h-screen space-y-6 px-4">
                <img src={img} alt="Space Invading Unicorns" className="w-32 h-32 rounded-full md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto" />
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-white font-pixel">
                    What is the most suitable <br /> country for you to live in?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-center text-gray-400">
                    Add your preferences and find out!
                </p>

                <div className="flex flex-wrap justify-center gap-2 py-10 w-full">
                    <FilterComponent title="Summer temperature" minLabel="< 0C" maxLabel="> 35C" minRange={0} maxRange={100} initialRange={temperature} onChange={setTemperature} />
                    <FilterComponent title="Winter temperature" minLabel="-25C" maxLabel="20C" minRange={0} maxRange={100} initialRange={temperature} onChange={setTemperature} />
                    <FilterComponent title="Pollution" minLabel="Low" maxLabel="High" minRange={0} maxRange={100} initialRange={pollution} onChange={setPollution} />
                    <FilterComponent title="Population density" minLabel="500" maxLabel="1.5 mil" minRange={0} maxRange={100} initialRange={population} onChange={setPopulation} />
                    <FilterComponent title="Tree Coverage" minLabel="0 %" maxLabel="100 %" minRange={0} maxRange={100} initialRange={treeCoverage} onChange={setTreeCoverage} />
                </div>

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
