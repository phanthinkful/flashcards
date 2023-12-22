import React, {useEffect, useState} from 'react';
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {readDeck} from "../../../utils/api";
import Breadcrumb from "../../../Layout/Breadcrumb";
import DeckInfoCard from "./DeckInfoCard";

function DeckInfo({deleteDeckWithId, deleteCardWithIdAndCallback}) {
    const {deckId} = useParams();
    const history = useHistory();
    const {url} = useRouteMatch();

    const [ deck, setDeck ] = useState({});
    const [ modified, setModified ] = useState(true);

    useEffect(() => {
        if (!modified) return;
        const controller = new AbortController();
        readDeck(deckId, controller.signal)
            .then(setDeck)
            .then(() => setModified(false))
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, [modified]);

    const deleteCardWithId = (cardId) => {
        deleteCardWithIdAndCallback(cardId, () => {setModified(true)});
    };

    if (!deck.id) return <p>Loading...</p>

    return (
        <div>
            <Breadcrumb pageName={deck.name} steps={[]}/>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <button
                type='button'
                onClick={() => history.push(`${url}/edit`)}
            >
                Edit
            </button>
            <button
                type='button'
                onClick={() => history.push(`${url}/study`)}
            >
                Study
            </button>
            <button
                type='button'
                onClick={() => history.push(`${url}/cards/new`)}
            >
                Add Cards
            </button>
            <button
                type='button'
                onClick={() => {
                    if (window.confirm('Delete this deck? You will not be able to recover it.')) {
                        deleteDeckWithId(deck.id);
                        history.push('/');
                    }
                }}
            >
                Delete
            </button>
            <div>
                <h3>Cards</h3>
                <ul>
                {
                    deck.cards.map((card, index) => {
                        return (
                            <li key={index}>
                                <DeckInfoCard
                                    card={card}
                                    deleteCardWithId={deleteCardWithId}
                                />
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        </div>
    );
}

export default DeckInfo;