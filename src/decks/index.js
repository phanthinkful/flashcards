import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

import NotFound from "../Layout/NotFound";
import New from './New';
import Deck from './deck';

function Decks({reloadDecks, deleteDeckWithId, deleteCardWithIdAndCallback}) {
    const {path} = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/new`}>
                <New reloadDecks={reloadDecks}/>
            </Route>
            <Route path={`${path}/:deckId`}>
                <Deck
                    reloadDecks={reloadDecks}
                    deleteDeckWithId={deleteDeckWithId}
                    deleteCardWithIdAndCallback={deleteCardWithIdAndCallback}
                />
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}

export default Decks;
