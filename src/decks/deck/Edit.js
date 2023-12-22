import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../Layout/Breadcrumb";
import {useHistory, useParams} from "react-router-dom";
import {updateDeck, readDeck} from "../../utils/api";
import DeckForm from "../helper/DeckForm";

function Edit({reloadDecks}) {
    const {deckId} = useParams();
    const history = useHistory();

    const [ deck, setDeck ] = useState({});
    const [breadCrumbDeckName, setBreadCrumbDeckName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const setDeckAndBreadcrumbDeckName = (deck) => {
        setDeck(deck);
        setBreadCrumbDeckName(deck.name);
    }

    useEffect(() => {
        if (submitted) return;
        const controller = new AbortController();
        readDeck(deckId, controller.signal)
            .then(setDeckAndBreadcrumbDeckName)
            .catch((error) => console.log(error));
        return () => {
            controller.abort();
        };
    }, [submitted]);

    useEffect(() => {
        if (!submitted) return;
        const controller = new AbortController();
        updateDeck(deck, controller.signal)
            .then(() => setSubmitted(false))
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
        history.push(`../${deckId}`);
    }

    if (!deck.id) return <p>Loading...</p>;

    const steps = [
        {name: breadCrumbDeckName, url: `../${deckId}`}
    ];

    return (
        <div>
            <Breadcrumb pageName='Edit Deck' steps={steps}/>
            <h2>Edit Deck</h2>
            <DeckForm
                deck={deck}
                setDeck={setDeck}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            />
        </div>
    );
}

export default Edit;
