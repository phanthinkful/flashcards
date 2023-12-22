import React, {useEffect, useState} from 'react';
import Breadcrumb from "../Layout/Breadcrumb";
import {createDeck} from "../utils/api";
import {useHistory} from "react-router-dom";
import DeckForm from "./helper/DeckForm";

function New({reloadDecks}) {
    const history = useHistory()

    const defaultDeckValues = {name: '', description: ''};
    const [deck, setDeck] = useState(defaultDeckValues);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!submitted) return;
        const controller = new AbortController();
        createDeck(deck, controller.signal)
            .then(() => setSubmitted(false))
            .then(() => setDeck(defaultDeckValues))
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, [submitted]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        reloadDecks();
    }

    const handleCancel = () => {
        history.push('/');
    }

    return (
        <div>
            <Breadcrumb pageName='Create Deck' steps={[]}/>
            <h2>Create Deck</h2>
            <DeckForm
                deck={deck}
                setDeck={setDeck}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}/>
        </div>
    );
}

export default New;
