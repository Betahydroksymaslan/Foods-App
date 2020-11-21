import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../assets/images/userIcon.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/home.svg";
import { ReactComponent as FoodIcon } from "../../assets/images/foodIcon.svg";
import { ReactComponent as FoodPlan } from "../../assets/images/foodPlan.svg";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const [isMenuExpand, setIsMenuExpand] = useState(true);

  /* useEffect(() => {
     
  }, []); */

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
          <FontAwesomeIcon icon={faChevronRight} />
        </li>

        <li>
          <NavLink className={navIcons} exact to="/Foods-App">
            <HomeIcon className="Nav__home-icon Nav__user-icon--home" />
          </NavLink>
        </li>

        <li>
          <NavLink className={navIcons} to="/foodBook">
            <FoodIcon className="Nav__food-icon Nav__user-icon--food" />
          </NavLink>
        </li>

        <li>
          <NavLink className={navIcons} to="/training">
            <FoodPlan className="Nav__user-icon Nav__user-icon--foodPlan" />
          </NavLink>
        </li>

        <li>
          {
            <NavLink className={navIcons} to="/user">
              <UserIcon className="Nav__user-icon" />
            </NavLink>
          }
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
