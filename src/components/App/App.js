import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Store from "../../store/Store";
import Login from "../Login/Login";
import User from "../User/User";
import Home from "../Home/Home";
import FoodBook from "../FoodBook/FoodBook";
import Training from '../Training/Training';
import Dinner from '../FoodBook/Dinner/Dinner';
import MealPage from '../MealPage/MealPage';
import AddMeal from '../AddMeal/AddMeal';

function App() {
  return (
    <Router>
      <Store>
        
        <section className="App">
          <Switch>
            <Route path="/user" component={User} />
            <Route path="/login" component={Login} />
            <Route path="/Foods-App" exact component={Home} /> 
            <Route exact path="/foodBook" component={FoodBook} />
            <Route exact path="/foodBook/dinner" component={Dinner} />
            <Route exact path="/foodBook/dinner/:name" component={MealPage} />
            <Route path='/training' component={Training} />
            <Route path="/addMeal" component={AddMeal}/>
          </Switch>
        </section>
      </Store>
    </Router>
  );
}

export default App;
