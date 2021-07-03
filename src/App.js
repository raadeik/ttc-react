import logo from './logo.svg';
import './App.css';
import NextBus from "./ttc/NextBus";

const ttc_routelist = [
  {id: 504, stop: 2253, direction: 'East'},
  {id: 504, stop: 7211, direction: 'West'},
  {id: 511, stop: 5469, direction: 'South'},
  {id: 511, stop: 15214, direction: 'North'},
];

function App() {
  return (
    <div className="App">
      <NextBus routelist={ttc_routelist} />
    </div>
  );
}

export default App;
