import React, { useState} from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../assets/images/userIcon.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/home.svg";
import { ReactComponent as FoodIcon } from "../../assets/images/foodIcon.svg";
import { ReactComponent as FoodPlan } from "../../assets/images/foodPlan.svg";


const Navigation = () => {
  

  const [isMenuExpand, setIsMenuExpand] = useState(true);

  const navExpand = isMenuExpand
    ? "Nav__expand Nav__expand--rotate"
    : "Nav__expand";

  const navIcons = isMenuExpand
    ? "Nav__menu-icons Nav__menu-icons--expand"
    : "Nav__menu-icons";

  const navList = isMenuExpand ? "Nav__list Nav__list--expand" : "Nav__list";

  const navigation = isMenuExpand ? "Nav Nav__box-expand" : "Nav";

  return (
    <nav className={navigation}>
      <ul className={navList}>
        <li
          onClick={() => setIsMenuExpand(!isMenuExpand)}
          className={navExpand}
        >
          <div className="Nav__backIcon">
            <span className="Nav__backIcon--bars"></span>
          </div>
        </li>

        <li>
          <NavLink className={navIcons} exact to="/Foods-App">
            <HomeIcon className="Nav__icons Nav__user-icon--home" />
            
          </NavLink>
        </li>

        <li>
          <NavLink className={navIcons} to="/foodBook">
            <FoodIcon className="Nav__icons  Nav__user-icon--food" />
            
          </NavLink>
        </li>

        <li>
          <NavLink className={navIcons} to="/diet">
            <FoodPlan className="Nav__icons  Nav__user-icon--foodPlan" />
            
          </NavLink>
        </li>

        <li>
          
            <NavLink className={navIcons} to="/user">
              <UserIcon className="Nav__icons  Nav__user-icon--user" />
              
            </NavLink>
          
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
