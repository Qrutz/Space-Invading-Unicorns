import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet styles

const GlobeComponent = ({ coordinates }) => {
    const globeRef = useRef();
    const [showLeafletMap, setShowLeafletMap] = useState(false); // To switch to Leaflet map
    const [coords, setCoords] = useState({ lat: 51.1657, lng: 10.4515 }); // Default to Germany coordinates

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

        controls.autoRotate = false; // Stop auto-rotation if enabled
        globeRef.current.pointOfView({ lat, lng, altitude }, 2000); // Smooth transition to new coordinates

        // Set a timeout to switch to Leaflet map when zoomed in sufficiently
        setTimeout(() => {
            setShowLeafletMap(true); // Trigger map switch
        }, 2500); // Adjust timing to match zoom duration
    };

    return (
        <>
            <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
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
                        <MapContainer
                            center={[coords.lat, coords.lng]}
                            zoom={13}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                            <Marker position={[coords.lat, coords.lng]} />
                        </MapContainer>
                    )}
                </div>
            </div>
        </>
    );
};

export default GlobeComponent;
