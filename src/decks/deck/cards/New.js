import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../Layout/Breadcrumb";
import {useHistory, useParams} from "react-router-dom";
import {readDeck, createCard} from "../../../utils/api";
import CardForm from "../../helper/CardForm";

function New({reloadDecks}) {
    const initialCardState = {front: '', back: ''};

    const {deckId} = useParams();
    const history = useHistory();

    const [ deck, setDeck ] = useState({});
    const [ card, setCard ] = useState(initialCardState);
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
        if (!submitted) return;
        const controller = new AbortController();
        createCard(deckId, card, controller.signal)
            .then(() => setSubmitted(false))
            .then(() => setCard(initialCardState))
            .then(() => reloadDecks())
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
        history.push(`../../${deckId}`);
    }

    if (!deck.id) return <p>Loading...</p>;

    const steps = [
        {name: deck.name, url: `../../${deckId}`}
    ];

    return (
        <div>
            <Breadcrumb pageName='Create Deck' steps={steps}/>
            <h2>Add Card</h2>
            <CardForm
                card={card}
                setCard={setCard}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                submitLabel='Save'
                cancelLabel='Done'
            />
        </div>
    );
}

export default New;
