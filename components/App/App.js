import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Store from "../../store/Store";
import Login from "../Login/Login";
import User from "../User/User";
import Home from "../Home/Home";
import FoodBook from "../FoodBook/FoodBook";
import Diet from '../Diet/Diet';
import FoodCategory from '../FoodBook/FoodCategory/FoodCategory';
import MealPage from '../MealPage/MealPage';
import AddMeal from '../AddMeal/AddMeal';
import FavouriteMeals from '../FavouriteMeals/FavouriteMeals';
import DailyGoals from '../Diet/DailyGoals/DailyGoals';
import AddProduct from '../AddProduct/AddProduct';

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
            <Route exact path="/foodBook/:foodCategory" component={FoodCategory} />
            <Route exact path="/foodBook/:mealType/:name" component={MealPage} />
            <Route exact path="/diet/dailygoals" component={DailyGoals}/>
            <Route path='/diet' component={Diet} />
            <Route path="/addMeal" component={AddMeal}/>
            <Route path="/addProduct" component={AddProduct}/>
            <Route path="/favouriteMeals" component={FavouriteMeals}/>
            
          </Switch>
        </section>
      </Store>
    </Router>
  );
}

export default App;
