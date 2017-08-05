'use strict';

describe('Player', function() {
  var player;
  beforeEach(function() {
    player = new Player()
  });
  it('created with an empty results array of arrays', function() {
    expect(player.results).toEqual(get2DArray(10));
  });
  it('starts at round 0', function() {
    expect(player.roundNumber).toEqual(0);
  });
  it('starts on roll 0', function() {
    expect(player.rollNumber).toEqual(0);
  });
  describe('first roll', function() {
    describe('strike (10 pins down)', function() {
      beforeEach(function() {
        player.bowl(10);
      });
      it('moves to the next round', function() {
        expect(player.roundNumber).toEqual(1);
      });
      it('adds the result to the results array', function() {
        expect(player.results[0]).toEqual([10])
      });
    });
    describe('no strike', function() {
      beforeEach(function() {
        player.bowl(5);
      });
      it('stays in same round', function() {
        expect(player.roundNumber).toEqual(0);
      });
      it('updates roll number', function() {
        expect(player.rollNumber).toEqual(1);
      });
      it('adds first roll to results array', function() {
        expect(player.results[player.roundNumber]).toEqual([5]);
      });
    });
  });
  describe('second roll', function() {
    describe('wrongly entered result', function() {
      it('reduces second roll value if total pins for the round exceeds 10', function() {
        player.bowl(5);
        player.bowl(8);
        expect(player.results[0]).toEqual([5,5]);
      });
    });
    describe('correctly entered result', function() {
      beforeEach(function() {
        player.bowl(5);
        player.bowl(3);
      });
      it('moves to the next round', function() {
        expect(player.roundNumber).toEqual(1);
      });
      it('adds the result to the results array', function() {
        expect(player.results[0]).toEqual([5,3])
      });
      it('updates roll number', function() {
        expect(player.rollNumber).toEqual(0);
      });
    });
  });
  describe('last round', function() {
    beforeEach(function() {
      for(var i = 1; i < 10; i++) {
        player.bowl(10);
      }
    });
    describe('spare', function() {
      beforeEach(function() {
        player.bowl(5);
        player.bowl(5);
      });
      it('gives the player three rolls', function() {
        expect(player.gameOver).toEqual(false);
      });
      describe('end of game', function() {
        beforeEach(function() {
          player.bowl(8);
        });
        it('stores three rolls in results', function() {
          expect(player.results[9]).toEqual([5,5,8]);
        });
        it('game ends after third roll', function() {
          expect(player.gameOver).toEqual(true)
        });
      });
    });
    describe('strike', function() {
      beforeEach(function() {
        player.bowl(10);
      });
      it('gives player three rolls', function() {
        player.bowl(5);
        expect(player.gameOver).toEqual(false);
      });
      describe('end of game', function() {
        beforeEach(function() {
          player.bowl(8);
          player.bowl(2);
        });
        it('stores three rolls in results', function() {
          expect(player.results[9]).toEqual([10,8,2]);
        });
        it('game ends after third roll', function() {
          expect(player.gameOver).toEqual(true)
        });
      });
    });
    describe('no spare or strike', function() {
      beforeEach(function() {
        player.bowl(5);
        player.bowl(3)
      });
      it('game ends after second roll', function() {
        expect(player.gameOver).toEqual(true);
      });
    });
  });
});
