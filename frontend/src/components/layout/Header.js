import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

import classes from './Header.module.css';

function Header(props) {
    const menus = props.menus;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const exitClickHandler = (e) => {
        e.preventDefault();

        dispatch(authActions.logout());
        navigate({
            pathname: '/login'
        });
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark mb-1 ${classes['nav-color']}`}>
            <div className="container" >
                {menus.map(menu => {
                    return (
                        <NavLink key={menu.link} className={`navbar-brand ${classes['nav-color']} ${classes['nav-link']}`}
                                 to={menu.link}>{menu.title}
                        </NavLink>
                );
                })}
                <NavLink className={`navbar-brand ${classes['nav-color']} ${classes['nav-link']}`}
                         to='../login' onClick={exitClickHandler}>Вийти</NavLink>
            </div>
        </nav>
    );
}

export default Header;