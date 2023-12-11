import logo from './logo.svg';
import './App.css';
import {Navigation} from "./All Pages/Navigation";
import {HomeHeader} from "./HomePage/HomeHeader";
import {NewsLetter} from "./All Pages/NewsLetter";
import {Articles} from "./HomePage/Articles";
import {Copyright} from "./All Pages/Copyright";
import {SingleArticle} from "./components/single-article-component";

function App() {
  return (
      <div id="container">
        <Navigation />
        <HomeHeader />
        {/*<Articles />*/}
        <SingleArticle />
        <NewsLetter />
        <Copyright />
      </div>
  );
}

export default App;
