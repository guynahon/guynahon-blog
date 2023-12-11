import logo from './logo.svg';
import './App.css';
import {Navigation} from "./HomePage/Navigation";
import {HomeHeader} from "./HomePage/HomeHeader";
import {NewsLetter} from "./components/news-letter-component";
import {Articles} from "./HomePage/Articles";

function App() {
  return (
      <div id="container">
        <Navigation />
        <HomeHeader />
        <Articles />
        <NewsLetter />
      </div>
  );
}

export default App;
