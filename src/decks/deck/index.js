import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

import NotFound from "../../Layout/NotFound";
import DeckInfo from './deckInfo';
import Study from './study';
import Edit from './Edit';
import Cards from './cards';

function Deck({reloadDecks, deleteDeckWithId, deleteCardWithIdAndCallback}) {
    const {path} = useRouteMatch();
    return (
        <Switch>
            <Route path={path} exact>
                <DeckInfo
                    deleteDeckWithId={deleteDeckWithId}
                    deleteCardWithIdAndCallback={deleteCardWithIdAndCallback}
                />
            </Route>
            <Route path={`${path}/study`}>
                <Study/>
            </Route>
            <Route path={`${path}/edit`}>
                <Edit reloadDecks={reloadDecks}/>
            </Route>
            <Route path={`${path}/cards`}>
                <Cards reloadDecks={reloadDecks}/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}

export default Deck;
