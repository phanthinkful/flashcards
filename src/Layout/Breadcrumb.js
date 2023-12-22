import React from 'react';
import {Link} from "react-router-dom";

function Breadcrumb({pageName, steps}) {
    return (
        <div>
            <Link to='/'>Home</Link>
            {steps.map((step) => {
                return (
                    <>
                        {' / '}
                        <Link to={step.url}>{step.name}</Link>
                    </>
                );
            })}
            {` / ${pageName}`}
        </div>
    );
}

export default Breadcrumb;