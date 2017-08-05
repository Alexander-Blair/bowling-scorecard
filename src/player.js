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
  // else if(this.rollNumber === 0) { this._firstRound(pinsKnockedDown); }
  // else { this._secondRound(pinsKnockedDown); }
};

Player.prototype.bowlLastRound = function(pinsKnockedDown) {
  this.addRoll(pinsKnockedDown);
  console.log(this.currentRoll())
  console.log(this.isGameOver())
  if(this.isGameOver()) { this.endGame(); }
  else { this.rollNumber += 1; }
};

Player.prototype.isLastRound = function() {
  return (this.roundNumber + 1) === this.TOTALROUNDS
};

Player.prototype.isGameOver = function() {
  if(this.currentRoll().reduce(getSum) < 10 && this.rollNumber === 1) {
    return true;
  } else if(this.rollNumber === 2) {
    return true;
  }
}

Player.prototype.processRoll = function(pinsKnockedDown) {
  this.addRoll(pinsKnockedDown);
  if(this.isFirstRoundOver(pinsKnockedDown)) { this.endTurn() }
  else { this.rollNumber += 1; }
};

Player.prototype.isFirstRoundOver = function() {
  if(this.rollNumber === 1 || this._getRoll(0) === 10) { return true; }
};

Player.prototype._firstRound = function(pinsKnockedDown) {
  if(pinsKnockedDown >= this.TOTALPINS) {
    this.endTurn(this.TOTALPINS);
  } else {
    this.addRoll(pinsKnockedDown);
    this.rollNumber += 1;
  }
};
Player.prototype._secondRound = function(pinsKnockedDown) {
  if(this._getRoll(0) + pinsKnockedDown > this.TOTALPINS) {
    pinsKnockedDown = this.TOTALPINS - this._getRoll(0);
  }
  this.endTurn(pinsKnockedDown);
};

Player.prototype.endTurn = function(pinsKnockedDown) {
  // this.addRoll(pinsKnockedDown)
  this.roundNumber += 1;
  this.rollNumber = 0;
};

Player.prototype.addRoll = function(pinsKnockedDown) {
  result = this.verifyPins(pinsKnockedDown)
  this.currentRoll().push(result);
};

Player.prototype.verifyPins = function(pinsKnockedDown) {
  if(this.isLastRound()) { return this.verifyLastRoundPins(pinsKnockedDown); }
  else if(this._getRoll(0) + pinsKnockedDown > this.TOTALPINS) {
    return this.TOTALPINS - this._getRoll(0);
  }
  return pinsKnockedDown;
};

Player.prototype.verifyLastRoundPins = function(pinsKnockedDown) {
  if(this._getRoll(0) === 10 && this._getRoll(1) !== 10 && this.rollNumber === 2) {
    if(this._getRoll(1) + pinsKnockedDown > this.TOTALPINS) {
      return this.TOTALPINS - this._getRoll(1); }
  }
  if(this._getRoll(0) !== 10 && this.rollNumber === 1) {
    if(this._getRoll(0) + pinsKnockedDown > this.TOTALPINS) {
      return this.TOTALPINS - this._getRoll(0); }
  }
  return pinsKnockedDown;
};

Player.prototype.currentRoll = function() {
  return this.results[this.roundNumber];
};

Player.prototype._getRoll = function(number) {
  return this.currentRoll()[number];
};

Player.prototype.endGame = function() {
  this.gameOver = true;
};
