


import React from "react";

const Layout = ({title="title", description="", children, className}) => {
    return (
        <div>
            <div className="jumbotron">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className={className}>
                {children}
            </div>
        </div>

    )
}

export default Layout;