import React from 'react';
import { useState } from 'react';
import backImage from '../images/back.png';

const DrawCards = ({ tarotCards, maxCards=3 }) => {
    const [flippedCards, setFlippedCards] = useState({});
    const [shuffledCards, setShuffledCards] = useState([...tarotCards]);
    // const [canShuffle, setCanShuffle] = useState(true);
    
    const chooseCard = (id) => {
        // Once users choose a card, cannot reverse the card. Already flipped, do nothing
        // setCanShuffle(false);
        if (flippedCards[id]) return; 

        if (Object.keys(flippedCards).length < maxCards) {
            setFlippedCards((prev) => ({ ...prev, [id]: true }));
        }
        // if reach the maxCards, can navigate to AI chat page
        if (Object.keys(flippedCards).length === maxCards) {
            // navigate to AI chat page
            // navigate(`/chat`)
        }
    };

    const handleShuffle = () => {
        // if (!canShuffle) return;
        let temp = [...shuffledCards];
        for (let i = temp.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [temp[i], temp[j]] = [temp[j], temp[i]];
        }
        setShuffledCards(temp);
    };

    return (
        <div>
        <button
            onClick={handleShuffle}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
            🔀 Shuffle Cards
        </button>
        <div className="flip-card-container">
            {shuffledCards.map((card) => (
            <div className="flip-card" key={card.id} onClick={()=>chooseCard(card.id)}>
                <div className={`flip-card-inner ${flippedCards[card.id] ? 'flipped' : ''}`}>
                    <div className="flip-card-front">
                        <img src={backImage} alt={card.name} />
                    </div>
                    <div className={"flip-card-back"}>
                        <img src={card.image} alt={card.name} />
                    </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default DrawCards;