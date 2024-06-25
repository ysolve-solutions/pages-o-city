import { Routes, Route } from 'react-router-dom'
import { MosaicoCountries } from '../components/herritage/mosaico'
import { MosaicoStates } from '../components/mosaicoStates'
import { MosaicoCities } from '../components/mosaicoCities'
import { MosaicoHeritage } from '../components/mosaicoHeritage'
import HeritageIndividual from '../components/herritage'

function DashboardRoutes() {
  return (
    <Routes>
      <Route exact path="" element={   <MosaicoCountries/> } />
      { <Route
        path="/country/:idCountry"
        element={
        <MosaicoStates/>
       }
      /> }
       { <Route
        path="/country/:idCountry/state/:idState"
        element={<MosaicoCities/> }
      /> }
       { <Route
        path="/country/:idCountry/state/:idState/city/:idCity"
        element={<MosaicoHeritage/> }
      />}
        <Route
        path="/country/:idCountry/state/:idState/city/:idCity/heritage/:idHerritage"
        element={<HeritageIndividual/> }
      /> 
    </Routes>
  )
}

export default DashboardRoutes
