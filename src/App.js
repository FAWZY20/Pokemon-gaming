import './App.css';
import Sauvegarde from './component/SauvegardeCarte/SauvegardeCarte';
import Tirage from './component/TirageCarte/TirageCarte';

function App() {
  return (
    <div className="container-fluid overlay">
      <div className='container' >
        <div className='row'>
          <Sauvegarde />
          <Tirage />
        </div>
      </div>
    </div>
  );
}

export default App;
