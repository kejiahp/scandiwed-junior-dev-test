import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Category from './Components/Category/Category';
import { Route, Switch} from 'react-router-dom';
import Productdescription from './Components/ProductDescription/Productdescription';
import Cart from './Components/Cart/Cart';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Category}/>
        <Route path="/product" component={Productdescription}/>
        <Route path="/cart" component={Cart}/>
      </Switch>
    </>
  );
}

export default App;
