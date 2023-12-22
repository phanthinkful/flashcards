import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

import New from './New';
import Edit from './Edit';
import NotFound from "../../../Layout/NotFound";

function Cards({reloadDecks}) {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/new`}>
                <New reloadDecks={reloadDecks}/>
            </Route>
            <Route path={`${path}/:cardId/edit`}>
                <Edit reloadDecks={reloadDecks}/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}

export default Cards;
