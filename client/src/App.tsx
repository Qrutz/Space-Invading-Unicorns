
import './App.css'
import { BackgroundBeamsWithCollisionDemo } from './components/BannerDemo'
import { FilterComponent } from './components/Filter'
import { GlobeDemo } from './components/GlobeDemo'
import GlobeComponent from './components/GlobeV2'
import { AnimatedModalDemo } from './components/SearchButton'


function App() {

  return (

    <>
      <BackgroundBeamsWithCollisionDemo />
      <div className="flex justify-evenly w-full flex-wrap">
        <FilterComponent title="Temperature" minLabel="< -20C" maxLabel="> 35C" minRange={0} maxRange={100} initialRange={50} />
        <FilterComponent title="Pollution" minLabel="Low" maxLabel="High" minRange={0} maxRange={100} initialRange={50} />
        <FilterComponent title="Population" minLabel="500" maxLabel="1.5 mil" minRange={0} maxRange={100} initialRange={50} />
        <FilterComponent title="Tree Coverage" minLabel="0 %" maxLabel="100 %" minRange={0} maxRange={100} initialRange={50} />
      </div>

      {/* <AnimatedModalDemo /> */}



      <GlobeComponent />
    </>
  )
}

export default App
