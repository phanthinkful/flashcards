import React, {useState, useEffect} from "react";
import {Switch, Route} from 'react-router-dom';

import {deleteCard, deleteDeck, listDecks} from "../utils/api";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from '../home'
import Decks from '../decks';

function Layout() {
    const initialDeleteCardIdAndCallback = {cardId: -1, callback: () => {}}

    const [ decks, setDecks ] = useState([]);
    const [ modified, setModified ] = useState(true);
    const [ deleteDeckId, setDeleteDeckId ] = useState(-1);
    const [ deleteCardIdAndCallback, setDeleteCardIdAndCallback ] = useState(initialDeleteCardIdAndCallback);

    useEffect(() => {
        if (deleteDeckId === -1) return;
        const controller = new AbortController();
        deleteDeck(deleteDeckId, controller.signal)
            .then(() => setDeleteDeckId(-1))
            .then(() => reloadDecks())
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, [deleteDeckId]);

    useEffect(() => {
        if (deleteCardIdAndCallback.cardId === -1) return;
        const controller = new AbortController();
        deleteCard(deleteCardIdAndCallback.cardId, controller.signal)
            .then(() => setDeleteCardIdAndCallback(initialDeleteCardIdAndCallback))
            .then(() => reloadDecks())
            .then(() => deleteCardIdAndCallback.callback())
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, [deleteCardIdAndCallback]);

    useEffect(() => {
        if (!modified) return;
        const controller = new AbortController();
        listDecks(controller.signal)
            .then(setDecks)
            .then(() => setModified(false))
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, [modified]);

    const reloadDecks = () => setModified(true);
    const deleteDeckWithId = (deckId) => {
        setDeleteDeckId(deckId);
    }
    const deleteCardWithIdAndCallback = (cardId, callback) => {
        setDeleteCardIdAndCallback({
            ...deleteCardIdAndCallback,
            cardId: cardId,
            callback: callback
        });
    }

    return (
        <>
            <Header/>
            <div className="container">
                <Switch>
                    <Route path='/' exact>
                        <Home decks={decks} deleteDeckWithId={deleteDeckWithId}/>
                    </Route>
                    <Route path='/decks'>
                        <Decks
                            reloadDecks={reloadDecks}
                            deleteDeckWithId={deleteDeckWithId}
                            deleteCardWithIdAndCallback={deleteCardWithIdAndCallback}
                        />
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default Layout;
