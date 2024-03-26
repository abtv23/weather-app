import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import WeatherPage from "./components/WeatherPage";
import FavouritesBar from './components/FavouritesBar';

function App() {
  
  return (
    <div>
      <WeatherPage/>
      <FavouritesBar/>
    </div>
  )
}

export default App
