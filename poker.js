// npm run build
//node build/poker.js
import _ from "lodash";
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const type = ['diams','hearts','clubs','spades'];
let deck = [];
for(let x = 0 ; x < ranks.length ; x++){
  for(let y = 0 ; y < type.length ; y++){
    deck.push({'rank': ranks[x],'type':type[y],'weight':x});
  }
}
function  getHand(deck){
  deck = _.pullAt(deck,[0,1,2,3,4]);
  return deck.sort((card1,card2) => card2.weight - card1.weight);
}
function pnum(num){
  let deal = [];
  for(let i = 0; i < num; i++){
    deal.push(getHand(deck));
  }
  return deal;
}
function handstrength(hand){
  let sum = 0;
  let x = 0;
  for(let i = 0;i < hand.length-1; i++){
    if(hand[i].rank === hand[i+1].rank){
      sum++;
    }
    if(i < 3 && hand[i].rank === hand[i+2].rank){
      sum++;
    }
  }
  return sum;
}
function straight(hand){
  let sum = 0;
  for (let i = 0;i < hand.length-1; i++){
    if (hand[i].weight-1 === hand[i+1].weight){
      sum++
    }
  }
  if(sum === 4){
    return 3.5;
  }
  return 0;
}
function flush(hand){
  let sum = 0;
  for (let i = 0;i < hand.length-1; i++){
    if (hand[i].type === hand[i+1].type){
      sum++
    }
  }
  if(sum === 4){
    return 3.6;
  }
  return 0;
}
function special(hand){
  if(straight(hand) === 3.5 && flush(hand) === 3.6){
    if(hand[0].rank === 'A'){
      return 7;
    }
    return 6;
  }
  return 0;
}
function combo(hand){
  const strong = [straight(hand),flush(hand),special(hand),handstrength(hand)];
  return Math.max(...strong);
}
function high(hand){
  if (straight(hand) === 3.5 || flush(hand) === 3.6 || handstrength(hand) === 0){
    return hand[0].weight;
  }else if(handstrength(hand)!==4){
    for (let i = 0;i < hand.length;i++){
      if(hand[i].weight === hand[i+1].weight){
        return hand[i].weight;
      }
    }
  }else{
    for(let i = 0;i < hand.length-1; i++){
      if(i < 3 && hand[i].weight === hand[i+2].weight){
        console.log(hand[i+2].weight);
        return hand[i+2].weight;
      }
   }
 }
}
function game(cards1,cards2){
  if (combo(cards1) > combo(cards2)){
    return 'Player 1: Wins';
  }
  if(combo(cards1) < combo(cards2)){
    return 'Player 2: Wins';
  }
  if((high(cards1) > high(cards2))){
      return 'Player 1: Wins';
  }
  if(high(cards1) < high(cards2)){
      return 'Player 2: Wins';
  }
  return 'Tie';
}
deck = _.shuffle(deck);
const deal = pnum(2);
const hand1 = deal[0];
const hand2 = deal[1];
console.log(hand1);
console.log(handstrength(hand1),high(hand1));
console.log(hand2);
console.log(handstrength(hand2),high(hand2));
console.log(game(hand1,hand2));
