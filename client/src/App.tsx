
import { useRef, useState } from 'react'
import './App.css'
import { LandingPage } from './components/LandingPage'

import GlobeComponent from './components/GlobeV2'




function App() {
  const [response, setResponse] = useState(null); // Moved response state here
  const globeRef = useRef(null); // Ref for GlobeComponent

  const scrollToGlobe = () => {
    if (globeRef.current) {
      // Ensure smooth scrolling to the globe element
      globeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const handleResponse = (data) => {
    setResponse(data); // Set the response (coordinates)

    // Scroll to the globe after a small delay to ensure it's rendered
    setTimeout(scrollToGlobe, 300); // Adjust the timeout if necessary
  };

  return (

    <>
      <LandingPage setResponse={handleResponse} />


      <div ref={globeRef}>
        {response && <GlobeComponent coordinates={response?.coordinates} />}
      </div>
    </>
  )
}

export default App
