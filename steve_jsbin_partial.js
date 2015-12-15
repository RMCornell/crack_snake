/**
 * Created by alchemy on 12/14/15.
 */
function Monster(x, y) {
  this.x = x;
  this.y = y;

  this.moveUp = this.move.bind(this, 0, -1);
  this.moveDown = this.move.bind(this, 0, 1);
  this.moveRight = this.move.bind(this, -1, 0);
  this.moveLeft = this.move.bind(this, -1, 0);
}

Monster.prototype.move = function(offsetX, offsetY) {
  this.checkForCollision(this.x + offsetX, this.y + offsetY);
  this.x = this.x + offsetX;
  this.y = this.y + offsetY;
  this.emit('new location', this.x, this.y);
  return this;
};

Monster.prototype.moveUp = function () {
  this.x--;
  return this;
};

Monster.prototype.moveDown = function () {
  this.x++;
  return this;
};

Monster.prototype.moveLeft = function () {
  this.y--;
  return this;
};

Monster.prototype.moveRight = function () {
  this.y++;
  return this;
};

Monster.prototype.moveUpAndLeft = function () {
  this.y--;
  this.x--;
  return this;
};

Monster.prototype.moveUpAndRight = function () {
  this.y--;
  this.x++;
  return this;
};

Monster.prototype.moveDownAndLeft = function () {
  this.y++;
  this.x--;
  return this;
};

Monster.prototype.moveDownAndRight = function () {
  this.y++;
  this.x++;
  return this;
};
