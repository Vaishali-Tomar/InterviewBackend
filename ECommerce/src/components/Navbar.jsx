import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { items } from "./Data";
import { BsFillCartCheckFill } from "react-icons/bs";

const Navbar = ({ setData, cart }) => {
  //console.log(useLocation());
  const location = useLocation();
  
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");

  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
  };

  const filterByPrice = (price) => {
    const ele = items.filter((product) => product.price >= Number(price));
    setData(ele);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchItem}`);
    setSearchItem("");
  };

  return (
    <div>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={"/"} className="brand">
            E-cart
          </Link>
          <form onSubmit={handleSubmit} className="search-bar">
            <input
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              type="text"
              placeholder="Search-items"
            />
          </form>
          <Link to={"/cart"} className="cart">
            <button type="button" className="btn btn-primary position-relative">
            <BsFillCartCheckFill style={{fontSize:'1.5rem'}} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
               {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </div>
        {
          location.pathname == "/" && (
            <div className="nav-bar-wrapper">
            <div className="itema">Filter by {"->"}</div>
            <div className="itema" onClick={() => setData(items)}>
              No Filter{" "}
            </div>
            <div className="itema" onClick={() => filterByCategory("mobiles")}>
              Mobiles
            </div>
            <div className="itema" onClick={() => filterByCategory("laptops")}>
              Laptops
            </div>
            <div className="itema" onClick={() => filterByCategory("tablets")}>
              Tablets
            </div>
            <div className="itema" onClick={() => filterByPrice(29990)}>
              {">="}29990
            </div>
            <div className="itema" onClick={() => filterByPrice(49000)}>
              {">="}49000
            </div>
            <div className="itema" onClick={() => filterByPrice(67000)}>
              {">="}67000
            </div>
            <div className="itema" onClick={() => filterByPrice(88000)}>
              {">="}88000
            </div>
          </div>
          )
          
        }
       
      </header>
    </div>
  );
};

export default Navbar;
