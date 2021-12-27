import './App.css';
import { useState, useEffect } from 'react';
import cards from './cards';

function Card(props) {
    const name = props.name;
    const imagePath = props.imagePath;
    const onClick = props.onClick;

    return (
        <div className="card" data-name={name} onClick={onClick}>
            <img src={imagePath} alt={name} />
            <h2>{name}</h2>
        </div>
    )
}

function CardSection(props) {
    const [shuffledCards, setShuffledCards] = useState([]);
    const [usedCards, setUsedCards] = useState([]);
    const setScore = props.setScore;

    function shuffleCards() {
        const shuffledCards = cards.sort(() => Math.random() - 0.5);
        setShuffledCards(shuffledCards);
    }

    function handleSelection(event) {
        shuffleCards();
        const cardName = event.currentTarget.dataset.name;
        const cardIndex = usedCards.indexOf(cardName);
        const hasLost = cardIndex !== -1;
        if (hasLost) {
            setUsedCards([]);
            setScore(prevScore => ({
                current: 0,
                best: Math.max(prevScore.best, prevScore.current),  
            }));
        } else {
            setUsedCards(prevState => prevState.concat(cardName));
            setScore(prevScore => ({
                ...prevScore,
                current: prevScore.current + 1,
                best: Math.max(prevScore.best, prevScore.current + 1),  
            }));
        }
    }

    useEffect(() => {
        shuffleCards();
    }, [])

    return (
        <div className="card-section">
            {shuffledCards.map((card, index) => {
                return <Card key={index} name={card.name} imagePath={card.imagePath} onClick={handleSelection}/>
            })}
        </div>
    )
}

function Scoreboard(props) {
    const score = props.score.current;
    const best = props.score.best;

    return (
        <div className="scoreboard">
            <h1>Scoreboard</h1>
            <div className="score">
                <h2>Highest Score: {best}</h2>
                <h2>Current Score: {score}</h2>
            </div>
        </div>
    )
}

function App() {
    const [score, setScore] = useState(
        {
            current: 0,
            best: 0,
        }
    )

    return (
      <div className="App">
          <header>
            <h1>Memory Game</h1>
            <Scoreboard score={score}/>
          </header>
          <CardSection setScore={setScore}/>
      </div>
    );
}

export default App;
