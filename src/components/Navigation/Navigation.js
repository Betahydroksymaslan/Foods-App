import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../assets/images/userIcon.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/home.svg";
import { ReactComponent as FoodIcon } from "../../assets/images/foodIcon.svg";
import { ReactComponent as FoodPlan } from "../../assets/images/foodPlan.svg";
import { ReactComponent as BackArrow } from "../../assets/images/backArrow.svg";



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
          <BackArrow  className="Nav__backIcon" />
        </li>

        <li>
          <NavLink className={navIcons} exact to="/Foods-App">
            <HomeIcon className="Nav__icons Nav__user-icon--home" />
            <p className="Nav__icons-name">Home</p>
          </NavLink>
        </li>

        <li>
          <NavLink className={navIcons} to="/foodBook">
            <FoodIcon className="Nav__icons  Nav__user-icon--food" />
            <p className="Nav__icons-name">Przepisy</p>
          </NavLink>
        </li>

        <li>
          <NavLink className={navIcons} to="/training">
            <FoodPlan className="Nav__icons  Nav__user-icon--foodPlan" />
            <p className="Nav__icons-name">Plan</p>
          </NavLink>
        </li>

        <li>
          {
            <NavLink className={navIcons} to="/user">
              <UserIcon className="Nav__icons  Nav__user-icon--user" />
              <p className="Nav__icons-name">User</p>
            </NavLink>
          }
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
