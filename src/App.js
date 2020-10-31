import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/scss/index.scss';
import Leftside from '../src/components/Leftside';
import Header from '../src/components/Header';
import Restaurant from '../src/components/Restaurant';
import Hotel from '../src/components/Hotel';
import Gym from '../src/components/Gym';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <div className="main-wrapper">
        <Leftside />
        <div className="main-wrapper-right">
          <Switch>
            <Route path="/" exact>
              <Restaurant />
            </Route>
            <Route path="/hotel">
              <Hotel />
            </Route>
            <Route path="/gym">
              <Gym />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
