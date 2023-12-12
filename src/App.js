import logo from './logo.svg';
import './App.css';
import {Navigation} from "./Pages/Navigation";
import {HomeHeader} from "./Pages/HomeHeader";
import {NewsLetter} from "./Pages/NewsLetter";
import {Articles} from "./Pages/Articles";
import {Copyright} from "./Pages/Copyright";
import {SingleArticle} from "./components/SingleArticle";

function App() {
  return (
      <div id="container">
        <Navigation />
        <HomeHeader />
        <Articles />
        {/*<SingleArticle />*/}
        <NewsLetter />
        <Copyright />
      </div>
  );
}

export default App;
