
// every card has 4 stages #initial(0), #temp(1), #notmatched(2) and #matched(3)
// and by default all cards in the initial stage.

// cards array of objects
var cards = [
    {
        id: "card-1-1",
        name: "paper_plane_1",
        value: 0, // status (from 0 to 3)
        pair: "card-1-2",
        icon: "fa fa-paper-plane-o fa-2x",
        order: 0 // from 0 to 15,
    },
    {
        id: "card-1-2",
        name: "paper_plane_2",
        value: 0, // status (from 0 to 3)
        pair: "card-1-1",
        icon: "fa fa-paper-plane-o fa-2x",
        order: 1 // from 0 to 15,
    },
    {
        id: "card-2-1",
        name: "diamond_1",
        value: 0, // status (from 0 to 3)
        pair: "card-2-2",
        icon: "fa fa-diamond fa-2x",
        order: 2 // from 0 to 15,
    },
    {
        id: "card-2-2",
        name: "diamond_2",
        value: 0, // status (from 0 to 3)
        pair: "card-2-1",
        icon: "fa fa-diamond fa-2x",
        order: 3 // from 0 to 15,
    },
    {
        id: "card-3-1",
        name: "cube_1",
        value: 0, // status (from 0 to 3)
        pair: "card-3-2",
        icon: "fa fa-cube fa-2x",
        order: 4 // from 0 to 15,
    },
    {
        id: "card-3-2",
        name: "cube_2",
        value: 0, // status (from 0 to 3)
        pair: "card-3-1",
        icon: "fa fa-cube fa-2x",
        order: 5 // from 0 to 15,
    },
    {
        id: "card-4-1",
        name: "anchor_1",
        value: 0, // status (from 0 to 3)
        pair: "card-4-2",
        icon: "fa fa-anchor fa-2x",
        order: 6 // from 0 to 15,
    },
    {
        id: "card-4-2",
        name: "anchor_2",
        value: 0, // status (from 0 to 3)
        pair: "card-4-1",
        icon: "fa fa-anchor fa-2x",
        order: 7 // from 0 to 15,
    },
    {
        id: "card-5-1",
        name: "bolt_1",
        value: 0, // status (from 0 to 3)
        pair: "card-5-2",
        icon: "fa fa-bolt fa-2x",
        order: 8 // from 0 to 15,
    },
    {
        id: "card-5-2",
        name: "bolt_2",
        value: 0, // status (from 0 to 3)
        pair: "card-5-1",
        icon: "fa fa-bolt fa-2x",
        order: 9 // from 0 to 15,
    },
    {
        id: "card-6-1",
        name: "bicycle_1",
        value: 0, // status (from 0 to 3)
        pair: "card-6-2",
        icon: "fa fa-bicycle fa-2x",
        order: 10 // from 0 to 15,
    },
    {
        id: "card-6-2",
        name: "bicycle_2",
        value: 0, // status (from 0 to 3)
        pair: "card-6-1",
        icon: "fa fa-bicycle fa-2x",
        order: 11 // from 0 to 15,
    },
    {
        id: "card-7-1",
        name: "leaf_1",
        value: 0, // status (from 0 to 3)
        pair: "card-7-2",
        icon: "fa fa-leaf fa-2x",
        order: 12 // from 0 to 15,
    },
    {
        id: "card-7-2",
        name: "leaf_2",
        value: 0, // status (from 0 to 3)
        pair: "card-7-1",
        icon: "fa fa-leaf fa-2x",
        order: 13 // from 0 to 15,
    },
    {
        id: "card-8-1",
        name: "bomb_1",
        value: 0, // status (from 0 to 3)
        pair: "card-8-2",
        icon: "fa fa-bomb fa-2x",
        order: 14 // from 0 to 15,
    },
    {
        id: "card-8-2",
        name: "bomb_2",
        value: 0, // status (from 0 to 3)
        pair: "card-8-1",
        icon: "fa fa-bomb fa-2x",
        order: 15 // from 0 to 15,
    }
];

// listen to each card click event.
document.querySelector(".game-area").addEventListener("click",function(evt) {
    if (evt.target.nodeName == "DIV") {
        checkPair(evt);
   }
   else {
       console.log("NONE");
   }
});

// General variables;
let starsNumber = 0;
var startPlay = false;
/**
 * The biggest function for manage the cards status and switch between all status
 * @param {*string} card - The event target of the card
 */
function checkPair(card) {
    if(startPlay === false) {
        startPlay = true;
        startTime();
    }
    flippFace(card);
    // check if another card in all cards in the temp statue
    if(checkTempStatue) {
        //check if the current card if in the initial statue
        let cardStatue = getCardStatue(card);
        // -- get the card pair status(value).
        let pairStatue = getCardPairStatue(card);
       if(getCardPairStatue(card) == 3) {
           // if the current card in the matched status do nothing.
       }
       else if (ifUnmatched() >= 2) {
           // if any cards in unmatched statue then wait (do nothing)
       }
       else if (getCardStatue(card) == 0) {
            // if one of the card in the temp statue
           if (checkTempStatue()) {
               // if the card id in the temp staue = the current one, then matched
               if(getTheTempCardId() == getCardPairId(card)) {
                   // match the pairs
                   let currentCardStatue = getCardStatue(card);
                   // match both cards
                   matchFace(card);
                   // update both cards status(value) to 3
                   updateCardStatue(card.target.attributes.id.nodeValue, 3);
                   updateCardStatue(getTheTempCardId(), 3);
                   // if all the cards matchd // end the game
                   // count stars
                   measureStars();
                   calculateMoves();
                   if(isAllMatched()) {
                       endGame();
                   }                   
               }
               else {
                   // unmatched two cards
                   notMatchFace(card);
                   // reset two cards
                   setTimeout(() => {
                       resetCard(card);
                   }, 500);
                   calculateMoves();
               }
           }
           else {
               // update the value of the card to 1 (temp statue)
               updateCardStatue(card.target.attributes.id.nodeValue, 1);
           }
        }
    }
}

// restart the game
document.querySelector("#btn-restart").addEventListener("click",function(e) {
   restartGame();
});
document.querySelector("#btn-refresh").addEventListener("click", function (e) {
    restartGame();
});

/**
 * Re-ordering cards rondomly.
 */
function generateRandomCards() {
    // bind all random cards in the html view
    let _cards = document.querySelector(".game-area").children;
    for (let i of _cards) {
        let randomNumber = Math.floor((Math.random() * 15) + 0);
        i.style.cssText = `order:${randomNumber}`;
        console.log("d");
    }
}
/**
 * check if all the paris are flipped
 */
function ifAllParisFlipped() {
    let allPaired = true;
    for (let i in cards) {
        if (cards[i].value !== 3) {
            allPaired = false;
            return false;
        }
    }
    return true;
}

/**
 * check for the temp statue of the all cards
 */
function checkTempStatue() {
    for (let i in cards) {
        if(cards[i].value == 1){
            return true;
        }
    }
    return false;
}
/**
 * get the statue(value) of a card
 * @param {*string} card - event target
 */
function getCardStatue(card) {
    let id = card.target.attributes.id.nodeValue;
    let cardValue = 0;
    for(let i in cards){
        if(cards[i].id == id){
            return cards[i].value;
        }
    }
}

/**
 * get the card pair status (value)
 * @param {*string} card event target
 */
function getCardPairStatue(card) {
    let id = card.target.attributes.id.nodeValue;
    let pairdCardId = "";
    // iterate to get the paired card id
    for (let i in cards) {
        if (cards[i].id == id) {
            pairdCardId= cards[i].pair;
        }
    }
    // iterate to get the paired card value
    for (let j in cards) {
        if (cards[j].id == pairdCardId) {
            return cards[j].value;
        }
    }
}

/**
 * get the card pair Id
 * @param {*string} card - event target
 */
function getCardPairId(card) {
    let id = card.target.attributes.id.nodeValue;
    let pairdCardId = "";
    // iterate to get the paired card id
    for (let i in cards) {
        if (cards[i].id == id) {
            pairdCardId = cards[i].pair;
        }
    }
    // iterate to get the paired card value
    for (let j in cards) {
        if (cards[j].id == pairdCardId) {
            return cards[j].id;
        }
    }
}
/**
 * Update the staute (value) of the card.
 * @param {*cardId} cardId - id selector of the card.
 * @param {*value} value - the new value assigned to the card statue(value).
 */
function updateCardStatue(cardId,value) {
    let id = cardId;
    for(let i in cards){
        if(cards[i].id == id){
            cards[i].value = value;
        }
    }
}

/**
 * Get the card id in temp statue
 */
function getTheTempCardId(){
    for (let i in cards) {
        if (cards[i].value == 1) {
            return cards[i].id;
        }
    }
}

/**
 * Get the card in temp statue
 */
function getTheUnMatchedCardId() {
    for (let i in cards) {
        if (cards[i].value ==2) {
            return cards[i].id;
        }
    }
}

/**
 * Check if the all cards matched.
 */
function isAllMatched() {
  for(let i in cards){
      if(cards[i].value != 3){
          return false;
      }
  }
  return true;
}

/**
 * Get matched cards count.
 */
function getMatchedCount() {
    let matchedCount=0;
    for(let i in cards){
        if(cards[i].value == 3){
            matchedCount ++;
        }
    }
    return matchedCount;
}
/**
 * Get unmatched cards // statue 2
 */
function ifUnmatched() {
    for (let i in cards) {
        if (cards[i].value == 2) {
            return true;
        }
    }
    return false;
}

/**
 * To end the game - appear the model dialog with the results.
 */
function endGame() {
    // end the timer
    timer.stop();
    startPlay = false;
    // calculate the time with seconds
    document.querySelector("#user-time").textContent = document.querySelector("#timer-seconds").textContent;
    // calculate all moves 
    document.querySelector("#user-moves").textContent = document.querySelector("#span-moves").textContent;
    // show the final dialog
    document.querySelector(".model-box").style.cssText = "display:inline";
    // calculate the stars && copy the existing stars
    document.querySelector("#stars-result").textContent = starsNumber;
}

/**
 * Restart the game -- reset everything.
 */
function restartGame() {
    // hide box model
    document.querySelector(".model-box").style.cssText = "display:none";
    // reset timer
    timer.stop();
    document.querySelector("#timer-seconds").textContent = "00:00:00";
    startPlay = false;
    // reset stars
    let stars = document.querySelector(".stars");
    for (let node of stars.children) {
        node.classList.remove("star-checked");
    }
    // reset moves counter
    document.querySelector("#span-moves").innerText = "0";
    console.log("dd", document.querySelector("#span-moves").innerHTML);
    // reset status and styles;
    updateAllCardsToInitial();
    // rearrange cards randomally
    generateRandomCards();
}

/**
 * Make the timer using EasyTimer.js library.
 */
let timer = new Timer();
function startTime() {
    timer.start();
    timer.addEventListener("secondsUpdated",function(e) {
        document.querySelector("#timer-seconds").textContent = timer.getTimeValues().toString();
    });
}

/**
 * Update all cards status to 0 (initial value)
 */
function updateAllCardsToInitial() {
    // update all cards values to 0(initial statue)
    for(let i in cards) {
        cards[i].value = 0;
    }
    // reset all styles.
    let _cards = document.querySelector(".game-area").children;
    for(let j of _cards){
        if(j.nodeName == "DIV"){
            if(j.className != "card"){
                j.classList.remove("flipped-face-card");
                j.classList.remove("matched-face-card");
                j.classList.remove("notmatched-face-card");
                j.firstElementChild.style.cssText = "dislay:none";
            }
        }
    }
    
}

/**
 * Measure stars.
 */
function measureStars() {
    // stars rank depands on the time and the number of moves.
    let timerValue = document.querySelector("#timer-seconds").textContent;
    let stars = document.querySelector(".stars");
    // calculate stars
    if (timerValue >= "00:00:01" && timerValue <= "00:00:10" && getMatchedCount() >= 10 && getMatchedCount() <=16) {
        for (let node of stars.children) {
            node.classList.add("star-checked");
        }
        starsNumber = 3;
    }
    else if (timerValue >= "00:00:11" && timerValue <= "00:00:25" && getMatchedCount() >= 8 && getMatchedCount() <= 10) {
        for (let i = 0; i < stars.children.length; i++) {
            if (i == 0 || i == 1) {
                stars.children[i].classList.add("star-checked");
            }
        }
        starsNumber = 2;
    }
    else if (timerValue >= "00:00:26" && getMatchedCount() >= 4 && getMatchedCount() <= 8) {
        stars.firstElementChild.classList.add("star-checked");
        starsNumber = 1;
    }
}

/**
 * Calculate moves
 */
function calculateMoves() {
    let moves = Number(document.querySelector("#span-moves").innerHTML) +1;
    document.querySelector("#span-moves").innerHTML = moves;
}

/**
 * Add css class in the temp stage.
 * @param {*string} card - event target
 */
function flippFace(card) {
    // show fa icon
    card.target.childNodes[1].style.cssText = "display:inline";
    // add flipped css class to the card
    card.target.classList.add("flipped-face-card");
}

/**
 * Add css class in the matching stage.
 * @param {*string} card - event target
 */
function matchFace(card) {
    card.target.classList.add("matched-face-card");
    card.target.classList.remove("flipped-face-card");
    let pairCard = getCardPairId(card);
    let pairEl = document.querySelector(`#${pairCard}`);
    pairEl.classList.remove("flipped-face-card");
    pairEl.classList.add("matched-face-card");
}

/**
 * Add css class in not-matched stage.
 * @param {*string} card -event target
 */
function notMatchFace(card) {
    card.target.classList.add("notmatched-face-card");
    // remove flipped class
    card.target.classList.remove("flipped-face-card");
    // add not-matched css class to the second card
    let card2_id = getTheTempCardId();
    document.querySelector(`#${card2_id}`).classList.add("notmatched-face-card");
    document.querySelector(`#${card2_id}`).classList.remove("flipped-face-card");
    // update two cards to temp status to unmatched status(2)
    updateCardStatue(card2_id, 2);
}

/**
 * Reset all cards an info to the original statue.
 * @param {*string} card - event target
 */
function resetCard(card) {
    // get the card id in the unmatched statue
    let unMatchedCard = getTheUnMatchedCardId();
    // remove flipped class
    card.target.classList.remove("flipped-face-card");
    // remove unmatched css class
    card.target.classList.remove("notmatched-face-card");
    // hide fa icon
    card.target.childNodes[1].style.cssText = "display:none";
    // resert the pair card also
    let pairCardElement = document.querySelector(`#${unMatchedCard}`);
    // remove flipped class
    pairCardElement.classList.remove("flipped-face-card");
    // remove unmatched css class
    pairCardElement.classList.remove("notmatched-face-card");
    // hide fa icon
    pairCardElement.childNodes[1].style.cssText = "display:none";
    // update two cards to initial status
    updateCardStatue(card.target.attributes.id.nodeValue, 0);
    updateCardStatue(unMatchedCard, 0);
}