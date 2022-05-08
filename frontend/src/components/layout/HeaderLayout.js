import React from "react";
import Header from "./Header";
import Layout from "./Layout";

function HeaderLayout(props) {
    return (
        <React.Fragment>
            <Header menus={props.menus}></Header>
            <Layout>{props.children}</Layout>
        </React.Fragment>
    );
}

export default HeaderLayout;