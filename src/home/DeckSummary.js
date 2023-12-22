import React from 'react';
import {useHistory} from 'react-router-dom';

function DeckSummary({deck, deleteDeckWithId}) {
    const history = useHistory();

    return (
        <div>
            <h3>{deck.name}</h3>
            <p>{deck.cards.length} cards</p>
            <p>{deck.description}</p>
            <button
                type='button'
                onClick={() => history.push(`/decks/${deck.id}`)}
            >
                View
            </button>
            <button
                type='button'
                onClick={() => history.push(`/decks/${deck.id}/study`)}
            >
                Study
            </button>
            <button
                type='button'
                onClick={() => {
                    if (window.confirm('Delete this deck? You will not be able to recover it.')) {
                        deleteDeckWithId(deck.id);
                    }
                }}
            >
                Delete
            </button>
        </div>
    );
}

export default DeckSummary;