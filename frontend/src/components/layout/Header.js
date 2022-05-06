import React from "react";
import { NavLink } from "react-router-dom";

import classes from './Header.module.css';

function Header(props) {
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark mb-1 ${classes['nav-color']}`}>
            <div className="container" >
                <NavLink className={`navbar-brand ${classes['nav-color']} ${classes['nav-link']}`}
                         to='/reader/books'>Книги</NavLink>
                <NavLink className={`navbar-brand ${classes['nav-color']} ${classes['nav-link']}`}
                         to='/reader/checkouts'>Історія видач</NavLink>
                <NavLink className={`navbar-brand ${classes['nav-color']} ${classes['nav-link']}`}
                         to='../login'>Вийти</NavLink>
            </div>
        </nav>
    );
}

export default Header;