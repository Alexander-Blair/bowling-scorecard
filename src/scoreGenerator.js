function ScoreGenerator() {

};

ScoreGenerator.prototype.getRoundScore = function(roundNumber, scorecard) {
  var roundTotal = this.roundTotal(roundNumber, scorecard);
  if(roundTotal < 10 || roundTotal > 10) { return roundTotal; }
  var secondRoll = this.secondRoll(roundNumber, scorecard);
  if(scorecard[roundNumber].length === 2) {
     return roundTotal + secondRoll; }
  var thirdRoll = this.thirdRoll(roundNumber, scorecard);
  return roundTotal + secondRoll + thirdRoll
};

ScoreGenerator.prototype.roundTotal = function(roundNumber, scorecard) {
  if(scorecard[roundNumber].length > 0) {
    return scorecard[roundNumber].reduce(getSum);
  }
  return 0;
};

ScoreGenerator.prototype.secondRoll = function(roundNumber, scorecard) {
  return scorecard[roundNumber + 1][0] || 0;
};

ScoreGenerator.prototype.thirdRoll = function(roundNumber, scorecard) {
  return scorecard[roundNumber + 1][1] || scorecard[roundNumber + 2][0] || 0;
};

ScoreGenerator.prototype.returnScore = function(scorecard) {
  var total = 0; generator = this;
  scorecard.forEach(function(round, roundNumber) {
    total += generator.getRoundScore(roundNumber, scorecard)
  });
  return total;
};
