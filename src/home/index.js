import React from 'react';
import {useHistory} from 'react-router-dom';

import DeckSummary from './DeckSummary';

function Home({decks, deleteDeckWithId}) {
    const history = useHistory();
    return (
        <>
            <button
                type='button'
                onClick={() => history.push('/decks/new')}
            >
                Create Deck
            </button>
            <ul>
                {decks.map((deck, index) => (
                    <li key={index}>
                        <DeckSummary deck={deck} deleteDeckWithId={deleteDeckWithId}/>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Home;
