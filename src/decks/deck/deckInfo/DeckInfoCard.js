import React from 'react';
import {useHistory, useRouteMatch} from "react-router-dom";

function DeckInfoCard({card, deleteCardWithId}) {
    const history = useHistory();
    const {url} = useRouteMatch();

    return (
        <div>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <button
                type='button'
                onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
            >
                Edit
            </button>
            <button
                type='button'
                onClick={() => {
                    if (window.confirm('Delete this card? You will not be able to recover it.')) {
                        deleteCardWithId(card.id);
                    }
                }}
            >
                Delete
            </button>
        </div>
    );
}

export default DeckInfoCard;
