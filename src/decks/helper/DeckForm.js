import React from 'react';

function DeckForm({deck, setDeck, handleSubmit, handleCancel}) {
    const handleChange = ({target}) => {
        setDeck({
            ...deck,
            [target.id]: target.value,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>
                Name
                <input
                    type='text'
                    id='name'
                    placeholder='Deck Name'
                    value={deck.name}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor='description'>
                Description
                <textarea
                    id='description'
                    placeholder='Brief description of the deck'
                    value={deck.description}
                    onChange={handleChange}
                />
            </label>
            <button type='button' onClick={() => handleCancel()}>Cancel</button>
            <button type='submit'>Submit</button>
        </form>
    );
}

export default DeckForm;
