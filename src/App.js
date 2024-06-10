import './App.css';
import Header from './components/PrimerComponente';
import { SegundoComponente } from './container/SegundoComponente';

function App() {
  return (
    <div className="App">
      <header className="border-solid border-2 border-indigo-600">
      <Header />
      </header>
      <div className='flex justify-center border-solid border-2 border-indigo-600'>
      <SegundoComponente />
      </div>
    </div>
  );
}

export default App;
