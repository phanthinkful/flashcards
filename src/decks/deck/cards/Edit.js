import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {readCard, readDeck, updateCard} from "../../../utils/api";
import Breadcrumb from "../../../Layout/Breadcrumb";
import CardForm from "../../helper/CardForm";

function Edit({reloadDecks}) {
    const {deckId, cardId} = useParams();
    const history = useHistory();

    const [ deck, setDeck ] = useState({});
    const [ card, setCard ] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        readDeck(deckId, controller.signal)
            .then(setDeck)
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        readCard(cardId, controller.signal)
            .then(setCard)
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (!submitted) return;
        const controller = new AbortController();
        updateCard(card, controller.signal)
            .then(() => setSubmitted(false))
            .then(() => reloadDecks())
            .then(() => history.push(`../../../${deckId}`))
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, [submitted]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    }

    const handleCancel = () => {
        history.push(`../../../${deckId}`);
    }

    if (!deck.id) return <p>Loading...</p>;

    const steps = [
        {name: deck.name, url: `../../../${deckId}`}
    ];

    return (
        <div>
            <Breadcrumb pageName={`Edit Card ${cardId}`} steps={steps}/>
            <h2>{deck.name}: Add Card</h2>
            <CardForm
                card={card}
                setCard={setCard}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                submitLabel='Submit'
                cancelLabel='Cancel'
            />
        </div>
    );
}

export default Edit;
