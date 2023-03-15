"use strict";

// function solution(nums){
//     return nums?.sort((a,b) => a - b) || [];
//     }

//     solution([1,2,3,10,5])

// function plural(n) {
//     return n !== 1;
//   }

//   plural(0)

// String.prototype.isUpperCase = function () {
//   return this.split("").every((el) => el === el.toUpperCase());
// };

// console.log("I AM DONALD".isUpperCase());

// function twoSum(numbers, target) {
//   // for (let i = 0; i < numbers.length; i++) {
//   //   for (let j = 0; j < numbers.length; j++) {
//   //     if (i === j) {
//   //       continue;
//   //     } else if ((numbers[i] + numbers[j]) === target) {
//   //       return [i, j];
//   //     }
//   //   }
//   // }

// }

// console.log('🚀 ~ twoSum([1, 2, 3], 4):', twoSum([1, 2, 3], 4))

function peopleWithAgeDrink(old) {
  const age = {
    13: "drink toddy",
    17: "drink coke",
    20: "drink beer",
    99: 'drink whisky'
  };

  for (let key in age) {
    if (old <= parseInt(key)) {
      return age[key];
    }
  }
  

  // return old < 14 ? 'drink toddy' : old < 18 ? 'drink coke' : old < 21 ? 'drink beer': 'drink whisky';
}

console.log("🚀 ~ peopleWithAgeDrink(22);:", peopleWithAgeDrink(70));
