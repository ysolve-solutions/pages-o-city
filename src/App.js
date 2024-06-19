import React from 'react';
import './App.css';
import Header from './components/PrimerComponente';
import { SegundoComponente } from './container/SegundoComponente';
function App({data}) {
  return (
    <div className="App">
      <header className="border-solid border-2 border-indigo-600">
      <Header data={data}/>
      </header>
      <div className='flex justify-center border-solid border-2 border-indigo-600'>
      <SegundoComponente data={data}/>
      </div>

    </div>
  );
}

export default App;