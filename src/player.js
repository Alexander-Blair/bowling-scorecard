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
  if((this.roundNumber + 1) === this.TOTALROUNDS) { this.bowlLastRound(pinsKnockedDown); }
  else if(this.rollNumber === 0) { this._firstRound(pinsKnockedDown); }
  else { this._secondRound(pinsKnockedDown); }
};

Player.prototype.bowlLastRound = function(pinsKnockedDown) {
  if(this.rollNumber === 0) {
    this.addRoll(pinsKnockedDown);
    this.rollNumber += 1;
  } else if(this.rollNumber === 1) {
    this.addRoll(pinsKnockedDown);
    if(this.currentRoll().reduce(getSum) < 10) {
      this.endGame();
    }
    this.rollNumber += 1;
  } else if(this.rollNumber){
    this.addRoll(pinsKnockedDown);
    this.endGame();
  }
};

Player.prototype._firstRound = function(pinsKnockedDown) {
  if(pinsKnockedDown >= this.TOTALPINS) {
    this._endTurn(pinsKnockedDown);
  } else {
    this.addRoll(pinsKnockedDown);
    this.rollNumber += 1;
  }
};
Player.prototype._secondRound = function(pinsKnockedDown) {
  if(this._firstRoll() + pinsKnockedDown > this.TOTALPINS) {
    pinsKnockedDown = this.TOTALPINS - this._firstRoll();
  }
  this._endTurn(pinsKnockedDown);
};

Player.prototype._endTurn = function(pinsKnockedDown) {
  this.addRoll(pinsKnockedDown)
  this.roundNumber += 1;
  this.rollNumber = 0;
};

Player.prototype.addRoll = function(pinsKnockedDown) {
  this.currentRoll().push(pinsKnockedDown);
};

Player.prototype.currentRoll = function() {
  return this.results[this.roundNumber];
};

Player.prototype._firstRoll = function() {
  return this.currentRoll()[0];
};

Player.prototype.endGame = function() {
  this.gameOver = true;
};
