import { ReactElement } from "react"
import { getCardUrl } from "../helpers/cardHelpers"
import reactLogo from "../images/logo192.png"
import '../style/card.css';

type cardProps ={
    cardNumber:number,
    isFliped:boolean,
    isInActive:boolean,
    isDisabled:boolean,
    onClick:Function,
    index:number
}

export const Card = ({
    cardNumber,
    isInActive,
    isFliped,
    onClick,
    isDisabled,
    index
}:cardProps):ReactElement=>{

    const handleClick = () => {
        !isFliped && !isDisabled && onClick(index);
    };
   return(
       <div className={`card ${isInActive?"is-inactive":""} ${isFliped?"is-flipped":""}` } onClick={handleClick}>
            <div className="card-face card-back-face">
                <img src={getCardUrl(cardNumber)} height="auto" width={96} alt="Avatar"/>
            </div>

            <div className="card-face">
                <img src={reactLogo} alt="reactLogo"  height="auto" width={96} />
            </div>
       </div>

   )
}