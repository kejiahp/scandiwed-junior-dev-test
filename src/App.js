import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Category from './Components/Category/Category';
import { Route, Switch} from 'react-router-dom';
import Productdescription from './Components/ProductDescription/Productdescription';
import Cart from './Components/Cart/Cart';
import { Provider } from 'react-redux';
import { store } from './state-management/store';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route path="/product" component={Productdescription}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/" exact component={Category}/>
      </Switch>
    </Provider>
  );
}

export default App;
