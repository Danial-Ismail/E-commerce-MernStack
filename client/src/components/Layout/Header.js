import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiShoppingBag } from 'react-icons/gi'
import { useAuth } from '../../context/auth'
import useCategory from "../../hooks/useCategory";
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import { useCart } from '../../context/cart';
import {Badge} from "antd"
import "../../styles/Cart.css"
const Header = () => {
  const [auth, setAuth] = useAuth()
  const[cart]=useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth")
    toast.success("Logout Successfully")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary header">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <GiShoppingBag size={15} style={{ margin: "0 auto" }} />  CHIPPA STORE
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 display-flex">
              <SearchInput />
              <li className="nav-item">
                <Link to="/" className="nav-link" >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link" >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" >
                    Login
                  </Link>
                </li>
              </> : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>)}
              <li className="nav-item mt-2 ">
                <Badge count={cart?.length} showZero>
                <Link to="/cart" className="nav-link text-lg cart-link" >
                  Cart
                </Link>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header