function Player() {
  this.TOTALPINS = 10
  this.TOTALROUNDS = 10
  this.results = get2DArray(10);
  this.roundNumber = 0;
  this.rollNumber = 0;
  this.gameOver = false;
};

Player.prototype.bowl = function(pinsKnockedDown) {
  if(this.gameOver) { return }
  if(this.isLastRound()) { this.bowlLastRound(pinsKnockedDown); }
  else { this.processRoll(pinsKnockedDown); }
};

Player.prototype.bowlLastRound = function(pinsKnockedDown) {
  this.addRoll(pinsKnockedDown);
  if(this.isGameOver()) { this.endGame(); }
  else { this.rollNumber += 1; }
};

Player.prototype.processRoll = function(pinsKnockedDown) {
  this.addRoll(pinsKnockedDown);
  if(this.isFirstRoundOver(pinsKnockedDown)) { this.endTurn() }
  else { this.rollNumber += 1; }
};

Player.prototype.addRoll = function(pinsKnockedDown) {
  result = this.verifyPins(pinsKnockedDown)
  this.currentRoll().push(result);
};

Player.prototype.endTurn = function(pinsKnockedDown) {
  this.roundNumber += 1;
  this.rollNumber = 0;
};

Player.prototype.endGame = function() { this.gameOver = true; };

Player.prototype.currentRoll = function() {
  return this.results[this.roundNumber];
};

Player.prototype._getRoll = function(number) {
  return this.currentRoll()[number];
};

Player.prototype.verifyPins = function(pinsKnockedDown) {
  if(this.isLastRound()) { return this.verifyLastRoundPins(pinsKnockedDown); }
  return this.removeExcessPins(0, pinsKnockedDown);
};

Player.prototype.verifyLastRoundPins = function(pinsKnockedDown) {
  if(this._getRoll(0) === 10 && this._getRoll(1) !== 10 && this.rollNumber === 2) {
    return this.removeExcessPins(1, pinsKnockedDown);
  }
  if(this._getRoll(0) !== 10 && this.rollNumber === 1) {
    return this.removeExcessPins(0, pinsKnockedDown);
  }
  return pinsKnockedDown;
};

Player.prototype.removeExcessPins = function(rollNumber, pinsKnockedDown) {
  if(this._getRoll(rollNumber) + pinsKnockedDown > this.TOTALPINS) {
    return this.TOTALPINS - this._getRoll(rollNumber);
  } else { return pinsKnockedDown; }
};

Player.prototype.isFirstRoundOver = function() {
  if(this.rollNumber === 1 || this._getRoll(0) === 10) { return true; }
};

Player.prototype.isLastRound = function() {
  return (this.roundNumber + 1) === this.TOTALROUNDS
};

Player.prototype.isGameOver = function() {
  if((this.currentRoll().reduce(getSum) < 10 && this.rollNumber === 1) ||
      this.rollNumber === 2) {
    return true; }
};
