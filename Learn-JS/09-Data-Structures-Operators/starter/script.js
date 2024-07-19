// 'use strict';

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
// };

// const [main, secondary] = restaurant.categories;
// console.log(main, secondary);

// console.log('///////////');
// const nested = [2, 4, [5, 6]];
// const [i, j] = nested;

// console.log(i, j);

// console.log('///////////');
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // Mutating variables.
// console.log('///////////');
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj);
// console.log(a, b);

// // nested objects
// const {
//   fri: { open, close },
// } = openingHours;

// console.log('///////////');

// // spread operator
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// const newArr = [...arr];
// console.log(newArr);

// console.log('///////////');

// // because on LEFT side of..
// const arr1 = [1, 2, ...[3, 4]];

// const [c, d, ...others] = [1, 2, 3, 4, 5];
// console.log(c, d, others);

// //
// // const [pizza, rei, ...otherFood] = [
// //   ...restaurant.mainMenu,
// //   ...restaurant.starterMenu,
// // ];

// const [pizza, rei, ...otherFood] = [
//   'Pizza',
//   'Pasta',
//   'Risotto',
//   'Focaccia',
//   'Bruschetta',
//   'Garlic Bread',
//   'Caprese Salad',
// ];
// console.log(pizza, rei, otherFood);

// console.log('///////////');
// // 2. functions
// const add = function (...params) {
//   let sum = 0;
//   for (let index = 0; index < params.length; index++) {
//     sum += params[index];
//   }
//   console.log(sum);
// };

// add(2, 3, 4);
// add(2, 3, 4, 5);
// add(2, 3, 4, 5, 6);

// //
// const x = [3, 5, 7];
// add(...x);

// //
// restaurant.orderPizza = ['mushrooms', 'onion', 'olives', 'spinach'];
// // restaurant.orderPizza('mushrooms');

// // const [test] = restaurant.orderPizza;
// // console.log(test);

// const main1 = restaurant.orderPizza;
// console.log(main1);

// // const {restaurant.orderPizza} =
// // console.log(restaurant.orderPizza);

// We're building a football betting app (soccer for my American friends 😅)!

// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// 1. Create one player array for each team (variables 'players1' and 'players2')

// 2. The first player in any player array is the goalkeeper and the others are field players.
//For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name,
// and one array ('fieldPlayers') with all the remaining 10 field players

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number
 (Example: "Goal 1: Lewandowski")

2. Use a loop to calculate the average odd and log it to the console 
(We already studied how to calculate averages, you can go check if you don't remember)

3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1

// const nameScored = [...game.scored];
// console.log('name : ', nameScored);

// // [], {}
// // let, const, var
// let count = 1;
// for (const i of nameScored) {
//   console.log(`Goal ${count++}: ${i}`);
// }

// // 2
// const value = Object.values(game.odds);

// let result = 0;
// for (const i of value) result += i;
// const avg = result / value.length;
// console.log('avg : ', avg);

// // 3.
// const odds = Object.entries(game.odds);
// // console.log('odds : ', odds);

// for (const name of odds) {
//   //console.log('name : ', name);
//   const nameStr = name[0] === 'x' ? 'draw' : `victory ${game[name[0]]}`;

//   console.log(`Odd of ${nameStr}: ${name[1]}`);
// }

// SET
// const staff = new Set(['hi', 'he', 'me', 'hi', 'he']);
// const staff1 = ['hi', 'tong', 'lala'];
// const staff2 = new Set(staff1);
// // console.log(staff2);
// console.log(...new Set(staff2));

// MAP
// const rest = new Map();

// rest.set('name', 'name value');
// rest.set(1, 'one value');
// rest.set('key', 'value');
// console.log(rest);

// rest.set('open', 11).set('close', 23).set(true, 'we arre open');

// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// const openingHours = {
//   [weekdays[3]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekdays[4]]: {
//     open: 11,
//     close: 23,
//   },
//   [weekdays[5]]: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };
// console.log(openingHours);
// console.log('------------------');
// console.log(Object.entries(openingHours));

/*
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// const events = [...new Set(gameEvents.values())];
// console.log(events);

// gameEvents.delete(64);
// console.log(gameEvents);

// 3
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );
// const time = [...gameEvents.keys()].pop();
// console.log(time);
// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

// 4
// for (const [key, value] of gameEvents.entries()) {
//   if (key <= 45) {
//     console.log(` [FIRST HALF]  ${key}: ${value}`);
//   } else {
//     console.log(` [SECOND HALF]  ${key}: ${value}`);
//   }
// }

const numbers = [-5, -3, 0, 3, 5, 8, 10];

// Trích xuất các phần tử từ chỉ số -3 đến chỉ số -1 (không bao gồm)
const slicedNegativePositive = numbers.slice(-3, -1);
console.log(slicedNegativePositive); // Output: [5, 8]

// convert

// //
// const [players1, players2] = game.players;
// console.log('player1 : ', players1);
// console.log('player2 : ', players2);

// // 2
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// //3
// const allPlayers = [...players1, ...players2];
// console.log('allPlayers : ', allPlayers);

// //4.
// const teamReserve = ['Thiago', 'Coutinho', 'Perisic'];
// const players1Final = [...players1, ...teamReserve];
// console.log('players1Final : ', players1Final);

// //5.
// const x = 10;
// const {
//   odds: { team1, x: draw, team2 },
// } = game;

// console.log('x: ', x);
// console.log('draw: ', draw);

// //6.
// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length} goals were scored`);
// };

// // printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals('Davies', 'Muller');
// //printGoals(...game.scored);

// // 7
// team1 < team2 && console.log('Team 1 is more likely to win');

// //
// const test = [...players1];
// console.log(test);

// for (const i of test) console.log(i);
