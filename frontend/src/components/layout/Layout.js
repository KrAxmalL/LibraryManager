import React from "react";

import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div className={`container text-center ${classes['top-container']}`}>
            <div className={`card border-0 shadow my-4 ${classes['middle-container']}`}>
                <div className={`card-body p-4${classes['card']}`}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;