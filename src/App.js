import './App.css';
import Tirage from './component/TirageCarte/TirageCarte';

function App() {
  return (
    <div className="container-fluid overlay">
      <div className='container' >
        <div className='row'>
          <Tirage/>
        </div>
      </div>
    </div>
  );
}

export default App;
