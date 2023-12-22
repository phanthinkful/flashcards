import React, {useState} from 'react';

function StudyCard({deck, index, nextCard}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const card = deck.cards[index];

    return (
        <div>
            <h3>Card {index + 1} of {deck.cards.length}</h3>
            <p>{isFlipped ? card.back : card.front}</p>
            <button
                type='button'
                onClick={() => setIsFlipped(!isFlipped)}
            >
                Flip
            </button>
            {
                isFlipped ?
                    <button
                        type='button'
                        onClick={() => {
                            nextCard();
                            setIsFlipped(false);
                        }}
                    >
                        Next
                    </button>
                    :
                    <></>
            }
        </div>
    );
}

export default StudyCard;
