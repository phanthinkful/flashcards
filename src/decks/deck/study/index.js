import React, {useEffect, useState} from 'react';
import {useHistory, useParams, useRouteMatch} from "react-router-dom";

import {readDeck} from "../../../utils/api";

import Breadcrumb from '../../../Layout/Breadcrumb'
import StudyCard from './StudyCard';

function Study() {
    const {deckId} = useParams();
    const history = useHistory();
    const {url} = useRouteMatch();

    const [ deck, setDeck ] = useState({});
    const [ index, setIndex ] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        readDeck(deckId, controller.signal)
            .then(setDeck)
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, []);

    const nextCard = () => {
        if (index < deck.cards.length - 1) setIndex(index + 1);
        else {
            if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) setIndex(0);
            else history.push('/');
        }
    }

    if (!deck.id) return <p>Loading...</p>

    const steps = [
        {
            name: deck.name,
            url: `../${deckId}`
        }
    ];

    return (
        <div>
            <Breadcrumb pageName='Study' steps={steps}/>
            <h2>Study: {deck.name}</h2>
            <div>
                {
                    deck.cards.length > 2 ?
                        <StudyCard deck={deck} index={index} nextCard={nextCard}/>
                        :
                        <div>
                            <h3>Not enough cards.</h3>
                            <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
                            <button
                                type='button'
                                onClick={() => history.push(`${url}/../cards/add`)}
                            >
                                Add Cards
                            </button>
                        </div>
                }
            </div>
        </div>
    );
}

export default Study;
