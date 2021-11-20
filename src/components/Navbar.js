import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn );
    const user=useSelector( state => state.auth.user ); 
  

    useEffect(()=>{
        // Initialize All Required DOM Element
        const burgerMenu = document.getElementById("burger");
        const navbarMenu = document.getElementById("menu");

        // Initialize Responsive Navbar Menu
        burgerMenu.addEventListener("click", () => {
            burgerMenu.classList.toggle("active");
            navbarMenu.classList.toggle("active");

            if (navbarMenu.classList.contains("active")) {
                navbarMenu.style.maxHeight = navbarMenu.scrollHeight + "px";
            } else {
                navbarMenu.removeAttribute("style");
            }
        });

        const navLink = document.getElementsByClassName("nav-link");
        console.log(navLink)
        Array.from(navLink).forEach(n => n.addEventListener("click", closeMenu));


        function closeMenu() {
            burgerMenu.classList.remove("active");
            navbarMenu.classList.remove("active");
            navbarMenu.removeAttribute("style");
        }
    },[])

    
    return (
        <nav className="navbar">
        <div className="container">
            <section className="wrapper">

                <p className="brand"><Link to='/' className="brand-link">Blog Site</Link></p>
                <button type="button" className="burger" id="burger">
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                </button>

                <div className="menu" id="menu">
                    {
                    !isLoggedIn ? 
                    <ul className="menu-inner">
                        <li><NavLink className="nav-link" to="/login-form">Login</NavLink></li>
                    </ul> :
                    ( (user && user.role==="admin") ? 
                        <ul className="menu-inner">
                            <li><NavLink className="nav-link" to='/admin-dashboard'>Dashboard</NavLink></li>
                            <li><NavLink className="nav-link" to="/all-blogs">All Blogs</NavLink></li>
                            <li><NavLink className="nav-link" to="/all-users">All Users</NavLink></li>
                            <li><NavLink className="nav-link" to='/' onClick={()=>dispatch(logout(alert,navigate))}>Logout</NavLink></li>
                        </ul>
                        
                        :
                        <ul className="menu-inner">
                            <li><NavLink className="nav-link" to="/blog-form">Create A Blog</NavLink></li>
                            <li><NavLink className="nav-link" to="/my-blogs">My Blogs</NavLink></li>
                            <li><NavLink className="nav-link" to='/' onClick={()=>dispatch(logout(alert,navigate))}>Logout</NavLink></li>
                        </ul>
                    )}
                </div>
            </section>
        </div>
    </nav>
    )
}

export default Navbar
