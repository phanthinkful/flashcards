import React from 'react';

function CardForm({card, setCard, handleSubmit, handleCancel, submitLabel, cancelLabel}) {
    const handleChange = ({target}) => {
        setCard({
            ...card,
            [target.id]: target.value,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='front'>
                Front
                <textarea
                    id='front'
                    placeholder='Front side of card'
                    value={card.front}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor='back'>
                Back
                <textarea
                    id='back'
                    placeholder='Back side of card'
                    value={card.back}
                    onChange={handleChange}
                />
            </label>
            <button type='button' onClick={() => handleCancel()}>{cancelLabel}</button>
            <button type='submit'>{submitLabel}</button>
        </form>
    );
}

export default CardForm;
