import { useEffect, useState } from 'react';

interface Card {
    id: number;
    value: number;
    isOpened: boolean;
    isFound: boolean;
}
const Game = () => {
    const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    numbers.sort(() => 0.5 - Math.random());
    const initialState: Card[] = numbers.map((number, index) => ({
        id: index,
        value: number,
        isOpened: false,
        isFound: false,
    }));
    const [grid, setGrid] = useState(initialState);
    const openedCards = grid.filter((c) => c.isOpened && !c.isFound);

    useEffect(() => {
        if (openedCards.length === 2) {
            const [first, second] = openedCards;
            const isEqual = first.value === second.value;

            setTimeout(
                () =>
                    setGrid(
                        grid.map((c) =>
                            c.id === first.id || c.id === second.id
                                ? {
                                      ...c,
                                      isOpened: isEqual,
                                      isFound: isEqual,
                                  }
                                : c
                        )
                    ),
                1000
            );
        }
    }, [grid, openedCards]);

    const handleCardClick = (clickedCard: Card) => {
        if (openedCards.length < 2)
            setGrid(
                grid.map((card) =>
                    card.id === clickedCard.id ? { ...card, isOpened: true } : card
                )
            );
    };

    return (
        <div>
            {grid.every((card) => card.isFound) ? (
                <button type="button" onClick={() => setGrid(initialState)}>
                    Play Again
                </button>
            ) : (
                <div className="grid">
                    {grid.map((card) => (
                        <button
                            key={card.id}
                            type="button"
                            className="card"
                            style={{
                                transform: card.isOpened ? 'rotateY(0deg)' : 'rotateY(180deg)',
                                visibility: card.isFound ? 'hidden' : 'visible',
                            }}
                            onClick={() => handleCardClick(card)}
                        >
                            <span className="span">{card.value}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Game;
