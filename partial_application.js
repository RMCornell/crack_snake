/**
 * Created by alchemy on 12/14/15.
 */

function add(a,b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

var multiplyTwo = multiply.bind(null, 2);
var addOne = add.bind(null, 1);
var addTwo = add.bind(null, 2);
var subtractThree = add.bind(null, -3);
var doubleNumber = multiply.bind(null, 2);

console.log(addTwo(4));             // Should return 6
console.log(multiplyTwo(2));       // Should Return 4
console.log(addOne(1));             // Should return 2`
console.log(subtractThree(3));     // Should return 0;
console.log(doubleNumber(5));     // Should return 10;

