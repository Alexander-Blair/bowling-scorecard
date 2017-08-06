function ScoreCard() {
  this.results = get2DArray(10);
};

ScoreCard.prototype.store = function(result, roundNumber) {
  if(roundNumber === 9) { result = this.verifyLastRoundPins(result, roundNumber); }
  else { result = this.verifyPins(result, roundNumber); }
  this.results[roundNumber].push(result);
};

ScoreCard.prototype.verifyPins = function(result, roundNumber) {
  var firstRoll = this.getRoll(roundNumber, 0);
  if(result > 10) { result = 10; }
  if(result + firstRoll > 10) { result = 10 - firstRoll; }
  return result;
};

ScoreCard.prototype.verifyLastRoundPins = function(result, roundNumber) {
  var firstRoll = this.getRoll(roundNumber, 0);
  var secondRoll = this.getRoll(roundNumber, 1);
  if(result > 10) { result = 10; }

  if(result + firstRoll > 10 && firstRoll !== 10 && firstRoll + secondRoll !== 10 ) {
    result = 10 - firstRoll;
  } else if(result + secondRoll > 10 && firstRoll === 10 && secondRoll !== 10) {
    result = 10 - secondRoll;
  }
  return result;
};

ScoreCard.prototype.getRoll = function(roundNumber, rollNumber) {
  return this.results[roundNumber][rollNumber] || 0;
};
