import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet styles

const GlobeComponent = ({ coordinates }) => {
    const globeRef = useRef();
    const [showLeafletMap, setShowLeafletMap] = useState(false); // To switch to Leaflet map
    const [coords, setCoords] = useState({ lat: 51.1657, lng: 10.4515 }); // Default to Germany coordinates
    const countryDetails = {
        country: "Sweden", // Hardcoded country name
        avgTemperature: "-5°C to 25°C", // Hardcoded average temperature
        avgPollution: "Low", // Hardcoded average pollution level
        population: "10 million", // Hardcoded population
        treeCoverage: "69%" // Hardcoded tree coverage
    };

    // Effect to trigger zoom when coordinates change
    useEffect(() => {
        if (coordinates) {
            setCoords(coordinates); // Update local coords
            zoomToCoordinates(coordinates.lat, coordinates.lng); // Trigger zoom
        }
    }, [coordinates]);

    // Function to zoom into given coordinates on the globe
    const zoomToCoordinates = (lat, lng) => {
        const controls = globeRef.current.controls();
        const altitude = 0.01; // Zoom in very close

        // print coords
        console.log(lat, lng);

        controls.autoRotate = false; // Stop auto-rotation if enabled
        globeRef.current.pointOfView({ lat, lng, altitude }, 6000); // Smooth transition to new coordinates

        // Set a timeout to switch to Leaflet map when zoomed in sufficiently
        setTimeout(() => {
            setShowLeafletMap(true); // Trigger map switch
        }, 6000); // Adjust timing to match zoom duration
    };

    // Function to refresh the page (Try Again button)
    const refreshPage = () => {
        window.location.reload(); // Simple page refresh
    };

    return (
        <>
            <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                    {!showLeafletMap ? (
                        <div style={{ width: '100%', height: '100%' }}>
                            {/* Globe Component */}
                            <Globe
                                ref={globeRef}
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                                backgroundColor="rgba(0, 0, 0, 0)" // Transparent background for the globe
                                pointOfView={{ lat: coords.lat, lng: coords.lng, altitude: 2 }} // Default position (updated with coordinates)
                            />
                        </div>
                    ) : (
                        // Leaflet Map appears after zoom-in
                        <div className="flex justify-start items-center h-screen bg-purple-600 p-10 rounded-lg space-x-20">
                            {/* Circular map container */}
                            <div className="relative w-[50vw] h-[75vh] rounded-full overflow-hidden shadow-xl border-4 border-white">
                                {/* Leaflet Map with a dark theme */}
                                <MapContainer
                                    center={[coords.lat, coords.lng]}
                                    zoom={13}
                                    className="h-full w-full rounded-full"
                                >
                                    <TileLayer
                                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                                    <Marker position={[coords.lat, coords.lng]} />
                                </MapContainer>
                            </div>

                            {/* Right side content */}
                            <div className="text-white space-y-8 max-w-md font-Fred">
                                <h2 className="text-3xl font-semibold font-pixel text-left mb-8">
                                    The most suitable country according to your preferences is {countryDetails.country}!
                                </h2>

                                <div className="space-y-2 text-lg">
                                    <p>Average summer temperature: {countryDetails.avgTemperature}</p>
                                    <p>Average winter temperature: {countryDetails.avgTemperature}</p>
                                    <p>Average pollution level: {countryDetails.avgPollution}</p>
                                    <p>Population density: {countryDetails.population}</p>
                                    <p>Tree coverage: {countryDetails.treeCoverage}</p>
                                </div>

                                <p className="mt-6 text-lg font-semibold">
                                    Explore the map to see the visualisation of the filters!
                                </p>

                                {/* Try Again button */}
                                <div className="flex justify-left mt-6">
                                    <button
                                        onClick={refreshPage} // Calls refreshPage when clicked
                                        className="bg-white text-purple-600 py-2 px-6 rounded-full text-lg hover:bg-gray-200 transition"
                                    >
                                        Try again
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default GlobeComponent;
