/**
 * Created by alchemy on 12/8/15.
 */


// Tutorial Code
//requestAnimationFrame(function gameLoop() {
//  context.clearRect(0, 0, canvas.width, canvas.height);
//  context.fillRect(x++, y, width, height);
//  requestAnimationFrame(gameLoop);
//});

// Exercise Pseudo Code
// Define object
// Define object positioning
// Define object movement


// Exercise Refactored Code
//var objectOne = { x: 50, y: 50, w: 10, h: 10 };
//var objectTwo = { x: 100, y: 50, w: 10, h: 10 };
//var objectThree = { x: 150 , y: 50, w: 10, h: 10 };
//var objectFour = { x: 200, y: 50, w: 10, h: 10 };

// My original Solution for first challenge
//function moveOne() {
//  requestAnimationFrame(function loop() {
//    context.clearRect(0, 0, canvas.width, canvas.height);
//      context.fillRect(objectOne.x, objectOne.y++, objectOne.w, objectOne.h);
//      context.fillRect(objectTwo.x, objectTwo.y++, objectTwo.w, objectTwo.h);
//      context.fillRect(objectThree.x, objectThree.y++, objectThree.w, objectThree.h);
//      context.fillRect(objectFour.x, objectFour.y++, objectFour.w, objectFour.h);
//    requestAnimationFrame(loop);
//  });
//}
//
//moveOne();

// Original Falling Block Function
//requestAnimationFrame(function loop() {
//  context.clearRect(0, 0, canvas.width, canvas.height);
//  blocks.forEach(function(block) {
//    block.draw().move();
//  });
//  requestAnimationFrame(loop);
//});

// Move Blocks back to Top of Canvas when reach bottom
//requestAnimationFrame(function loop() {
//  context.clearRect(0, 0, canvas.width, canvas.height);
//  blocks.forEach(function(block) {
//    if(block.y <= canvas.height) {
//      block.draw().move();
//    } else {
//      block.y = -1;
//      block.draw().move();
//    }
//  });
//  requestAnimationFrame(loop);
//});
