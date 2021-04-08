import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Premium News
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
