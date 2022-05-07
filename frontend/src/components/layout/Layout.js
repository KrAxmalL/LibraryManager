import React from "react";

import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div className={`${classes['top-container']}`}>
            <div className={`card border-0 shadow my-4 ${classes['middle-container']}`}>
                <main className={`card-body p-4${classes['card-content']}`}>
                    {props.children}
                </main>
            </div>
        </div>
    );
}

export default Layout;