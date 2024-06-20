import { Routes, Route } from 'react-router-dom'
import { MosaicoCountries } from '../components/herritage/mosaico'

function DashboardRoutes() {
  return (
    <Routes>
      <Route exact path="" element={   <MosaicoCountries/> } />
      {/* <Route
        path="/country/:idCountry"
        element={
        <MosaicoStates/>
       }
      /> */}
       {/* <Route
        path="/country/:idCountry/state/:idState"
        element={<MosaicoCity/> }
      /> */}
       {/* <Route
        path="/country/:idCountry/state/:idState/city/:idCity"
        element={<Mosaicoheritage/> }
      />
        <Route
        path="/country/:idCountry/state/:idState/city/:idCity/heritage/:idHerritage"
        element={<HeritageIndividual/> }
      /> */}
    </Routes>
  )
}

export default DashboardRoutes
