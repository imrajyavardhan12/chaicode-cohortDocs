
const chai = ['lemon tea', 'ginger tea', 'oolong tea', 'masala tea','3', 'random'];

//print
// for(let i = 0; i < chai.length; i++)
// {
//     console.log(chai[i]);
// }


//length property 
console.log(chai.length) // human readable length

// let chaiNew = chai   // this is shallow copy
let chaiNew = [...chai]; // this is deep copy
// let chaiNew = chai.slice(); // this is deep copy
// ... is spread operator

// console.log(chaiNew)
chaiNew[chaiNew.length-1] = 'White tea';
// console.log('original chai ->',chai)
// console.log('new chai ->',chaiNew)

console.log(chai['2'])

// ----- Array Methods --------

let arr1 = [1,2,3,4,5,6,7,8];

// .at() used to access element (can also take -ve values)
console.log(arr1.at(-5));

// .concat()

let arr2 = ['one','two','three','four'];

console.log(arr1.concat(arr2));

