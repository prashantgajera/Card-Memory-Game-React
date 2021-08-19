import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle
} from "@material-ui/core";

//logic to sort cards randomly to remove unwanted patterns
function shuffleCards(array:Array<number>) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function App() {

  const cardAr = [0,2,4,6,8,10,12,14];
  

  //initialize cards
  const [cards,setCards] = useState(()=>{
    const initilizeArr = shuffleCards(cardAr.concat(cardAr));
    return initilizeArr;
  });

  //set timer for user
  const [timer,setTimer] = useState(30);
  
  //state for open cards
  const [openCards, setOpenCards] = useState<number[]>([]);

  //state to show model
  const [showModal, setShowModal] = useState(false);

  //should timer start
  const [shouldStart,setShouldStart] = useState(false);
  
  //timeout Msg 
  const [timeoutMsg,setTimeoutMsg] = useState(false);

  //state for cleared cards
  const [clearedCards, setClearedCards] = useState<number[]>([]);
 
  //state for disabled cards
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
 
  const timeout:any = useRef(null);
  
  //handle user timeout
  useEffect(()=>{

    const timeout = setTimeout(()=>{

      if(shouldStart && !showModal){
        setTimer((timer)=>timer-1);
      }    

    },1000);
    return ()=>{clearTimeout(timeout)};
  })

  useEffect(()=>{
    if(timer===0 && !showModal){
      setShouldStart(false);
      setShowModal(true);
      setTimeoutMsg(true);
    }
  });

  useEffect(() => {
    checkCompletion();
  });

  useEffect(() => {
    let timeout:any = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkIsFlipped = (index:number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (cardNumber:number) => {
    return Boolean(clearedCards.includes(cardNumber)?true:false);
  };

  const checkCompletion = () => {
    if (clearedCards.length === cardAr.length) {
      setShowModal(true);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first] === cards[second]) {
      setClearedCards((prev) => [...prev, cards[first]]);
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index:number) => {
    setShouldStart(true);
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const handleRestart = () => {
    setClearedCards([]);
    setOpenCards([]);
    setShouldStart(false);
    setShowModal(false);
    setTimer(30);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(cardAr.concat(cardAr)));
  };
  

  return (
    <div className="App">
      <header role="heading" aria-level={1} className="App-header">
        <p>
          Mini Card Memory Game
        </p>
      </header>

      <div className="countdown"> 
        <span>You have <span className="numbers">{timer>0?timer:0}</span> seconds Left</span>
      </div>

      <div className="container">
        {
            cards.map((cardNumber,index)=>{
                return(
                  <Card
                    key={index}
                    cardNumber={cardNumber}
                    isFliped={checkIsFlipped(index)}
                    isInActive={checkIsInactive(cardNumber)}
                    onClick={handleCardClick}
                    isDisabled={shouldDisableAllCards}
                    index={index}
                  />
                )
            })
        }
      </div>
      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${timeoutMsg?
            "Oops, Looks Like You exceeded time limit, Well Don't worry let's restart."
            :"Hurray!!! Congrats, Your score is "+timer}`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            {`${timeoutMsg?"Restart":"Play Again"}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
