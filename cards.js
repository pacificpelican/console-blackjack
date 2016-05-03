//  sf3am.com/djmblog.com games code for Console Blackjack
//  Dec. 2015-April 2016 by Dan McKeown http://danmckeown.info
//  released under MIT License
//	v0.2.0
//  This version requires Immutable.js
//  https://facebook.github.io/immutable-js/

"use strict";

var numbers = ['ace','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king'];
var suit = ['clubs','diamonds','hearts','spades'];
var deckSize = numbers.length * suit.length;
var $dealt = [];	//	this is mostly unused in favor of this.current.dealt
var $thedeck = [];	//	this is mostly unused in favor of this.current.cards
var playerSet = [];

var deck = class cardSet {
    constructor() {
        this.cards = Immutable.List([]);
        this.dealt = [];
        var c = 0;
        for (var j=0; j<suit.length; j++) {
            for (var i=0; i<numbers.length; i++) {
                this.cards[c] = numbers[i] + " of " + suit[j];
                c++;
            }
        }
    }
}

var player = class gamer {
	constructor (name, cash, momentum) {
		var payz = playerSet.indexOf(name);
		console.log(payz);
		if (payz === -1) {
		console.log('creating new player ' + name);
		var pushThis = playerSet.push(name);
		this.login = name;
		this.holdings = cash;
		this.momentum = momentum;
		}
	}
}

var matchup = class gamemaker {
	constructor (player1, player2) {
		this.matchup = [];
		this.matchup[0] = player1;
		this.matchup[1] = player2;
	}
}

var blackjack = class twentyone {
	constructor (players, hands) {	//	players is an array of player objects via matchup
    	console.log('running blackjack');
    	this.current = new deck;
    	var player1 = {};
    	var player2 = {};
    	this.player1 = {};
    	this.player2 = {};
    	player1.nameid = players.matchup[0];
    	player2.nameid = players.matchup[1];
    	console.log(player1.nameid + " vs. " + player2.nameid);
    	if ((typeof player1 !== 'undefined') && (typeof player2 !== 'undefined')) {
    		player1.hand = this.buildHand();
    		this.player1.hand = player1.hand;
    		this.player1.login = player1.nameid;
    		player2.hand = this.buildHand();
    		this.player2.hand = player2.hand;
    		this.player2.login = player2.nameid;
    	}
	}

    scoreHand(hand, ace) {  //  the flaw in this method is its inability to let 1 ace be high and 1 be low
                            //  as far as I can tell the chances of 2 aces drawn in an intial hand: 0.0045
        var aceLow = false;
        console.log('scoring this hand.. ' +  hand);
        var total = 0;
        var str;
        var aceFlag = false;
        if (typeof ace !== 'undefined') {
            if (ace === true) {
                aceLow = true;
            //    console.log('aceLow is true');
            }
        }
        for (var i=0;i<hand.length;i++) {
            str = hand[i];
            //  console.log('card: ' + str);
            var n = str.indexOf("two");
            if (n !== -1) {
                total = total + 2;
            }
            var n = str.indexOf("three");
            if (n !== -1) {
                total = total + 3;
            }
            var n = str.indexOf("four");
            if (n !== -1) {
                total = total + 4;
            }
            var n = str.indexOf("five");
            if (n !== -1) {
                total = total + 5;
            }
            var n = str.indexOf("six");
            if (n !== -1) {
                total = total + 6;
            }
            var n = str.indexOf("seven");
            if (n !== -1) {
                total = total + 7;
            }
            var n = str.indexOf("eight");
            if (n !== -1) {
                total = total + 8;
            }
            var n = str.indexOf("nine");
            if (n !== -1) {
                total = total + 9;
            }
            var n = str.indexOf("ten");
            if (n !== -1) {
                total = total + 10;
            }
            var n = str.indexOf("jack");
            if (n !== -1) {
                total = total + 10;
            }
            var n = str.indexOf("queen");
            if (n !== -1) {
                total = total + 10;
            }
            var n = str.indexOf("king");
            if (n !== -1) {
                total = total + 10;
            }
            var n = str.indexOf("ace");
            if (n !== -1) {
                if (typeof ace !== 'undefined') {
                    total = total + 1
                }
                else {
                    total = total + 11;
                }
                aceFlag = true;
            }
        //    console.log('total is ' + total);
        }

            //  console.log('aceFlag: ' + aceFlag + " | aceLow: " + aceLow);
        if (total > 21) {
            console.log('total is over 21... ' + total);
            if ((aceFlag === true) && (aceLow !== true)) {
                var newFlag = aceFlag;
                return this.scoreHand(hand, aceFlag);
            }
            return false;
        }
        console.log('[low] total is ' + total);
        if (total >= 22) {
            return null;
        }
        else {
            return total;
        }
    }

	checkCard(n) {
        var checkSlot = this.current.dealt[n];
            if (typeof checkSlot === 'undefined') {
                return true;
		    }
    		else {
    			return false
    		}
        }

	buildHand() {
        //  This method needs duplication ('false') card results
		console.log('dealing a hand');
		var hand = ["ace of spades", "queen of hearts"];
		var card1 = false;
		var card2 = false;
		var numberdigit1 = Math.floor((Math.random() * deckSize) + 0);
		var numberdigit2 = Math.floor((Math.random() * deckSize) + 0);

		if (this.checkCard(numberdigit1) === true) {
			this.current.dealt[numberdigit1] = true;
			card1 = this.current.cards[numberdigit1];
		}

		if (this.checkCard(numberdigit2) === true) {
			this.current.dealt[numberdigit2] = true;
			card2 = this.current.cards[numberdigit2];
		}

		var hand = [card1, card2];
        return hand;
	}

	drawOneCard(entropy, callback) { //  this is a sub-helper function
		var card1 = false;
		var numberdigit1 = Math.floor(Math.random() * deckSize);

		if (this.checkCard(numberdigit1) === true) {
			this.current.dealt[numberdigit1] = true;
			card1 = this.current.cards[numberdigit1];
			         //  console.log(numberdigit1 + " : " + card1);
		}
		return card1;
	}

    score(player) {
        var playerHand;
        var playerScore;
        if ((player === "player1") || (player === this.player1.login)) {
            playerHand = this.player1.hand;
        }
        if ((player === "player2") || (player === this.player2.login)) {
            playerHand = this.player2.hand;
        }
        playerScore = this.scoreHand(playerHand);
        return playerScore;
    }

	getAcard() {    //  this is a helper function
        var cardDeck = deckSize;
		var newCard = this.drawOneCard();
		if (newCard !== false) {
			return newCard;
		}
		else if ($thedeck.length <= (cardDeck + 2)) {
            //  console.log('matches current card, do over..')
            return false;
		}
		else {
			console.log("game over");
			return null;
		}
	}

    howmanycards() {    //  this is a helper function
        var quan = this.current.dealt;
        var cardDeck = this.current.cards;
        var cardDeckL = cardDeck.length
        var cnt = 0;
        for (var i=0;i<quan.length;i++) {
            if (quan[i] === true) {
                cnt++;
            }
        }
        return cardDeckL - cnt - 1;
    }

    revealFirstCard(player) {
        var playerHand;
        var playerFirstCard;
        if ((player === "player1") || (player === this.player1.login)) {
            playerHand = this.player1.hand;
        }
        if ((player === "player2") || (player === this.player2.login)) {
            playerHand = this.player2.hand;
        }
        playerFirstCard = playerHand[0];
        return playerFirstCard;
    }

	hitMe(player, entropy, callback) {
		var aCard = this.getAcard();
		if ((aCard !== false) && (aCard !== 'undefined')) {
			if ((player === this.player1.login) || (player === 'player1')) {
				    //  console.log('now to add the ' + aCard + ' to the hand of ' + player);
				var player1hand = this.player1.hand
				var doItNow = player1hand.push(aCard);
				this.player1.hand = player1hand;
				return true;
			}
			if ((player === this.player2.login) || (player === 'player2')) {
				    //  console.log('now to add the ' + aCard + ' to the hand of ' + player);
				var player2hand = this.player2.hand
				var doItNow = player2hand.push(aCard);
				this.player2.hand = player2hand;
				return true;
			}
		}
        else {
            var dealtout = this.current.dealt;
            var left = this.howmanycards();
            var lefty = left + 1;
            var Dleft = 0;
            if (lefty > 0) {
                var Dleft = left + 1;
                console.log("only " + Dleft + " cards left in deck");
                this.hitMe(player, entropy, callback);
            }
            else {
                console.log('GAME OVER');
                return null;
            }
        }
	}
}
