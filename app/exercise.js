		"use strict";
		class Exercise {
	constructor() {
		this.path = require("path")
		this.deckName = getCookie("deck")
		this.fs = require('fs')
		this.deckPath = this.path.join(getCookie('usersPath'), getCookie("user"), "decks", getCookie("deck"), "cards")
		this.cardPath = this.path.join(this.deckPath, "0")
		this.directories = new Directories
		this.cardType = this.directories.readOneLine(this.path.join(this.cardPath, "info", "info.txt"), 0)
		this.cardContent = document.getElementById("cardContent");
		this.buttons = document.getElementById("buttons");
	}
	updateCard() {
		this.cardType = this.directories.readOneLine(this.path.join(this.cardPath, "info", "info.txt"), 0)
		switch (this.cardType) {
			case 't_t':
				this.currentCard = new Card_t_t;
				break;
			case 't_tt':
				this.currentCard = new Card_t_tt;
				break;
			case 'tt_t':
				this.currentCard = new Card_tt_t;
				break;
			case 'tt_tt':
				this.currentCard = new Card_tt_tt;
				break;
			case 'p_t':
				this.currentCard = new Card_p_t;
				break;
			case 'p_tt':
				this.currentCard = new Card_p_tt;
				break;
			case 'pt_t':
				this.currentCard = new Card_pt_t;
				break;
			case 'pt_tt':
				this.currentCard = new Card_pt_tt;
				break;
		}
	}
	printFront() {
		this.updateCard()
		this.currentCard.printFront(this.cardPath)
		document.getElementById("flipButton").style.visibility = "visible";
	}
	printBack() {
		this.removeFront()
		this.updateCard()
		this.currentCard.printBack(this.cardPath)
		document.getElementById("buttons").innerHTML = 
		`<div class='item item_mid' style="display: block;" id="rememberButtons">` +
							`<p style="margin-left: 65px; padding-top: 40px;">How well do you remember the card?</p>` +
							
							`<div class="item_buttons" style="display: inline-flex; margin-left: 110px ;">` +
								
								`<img class="item_button" src="assets/button_vbad.png" alt="" id="vbad" onclick="exercise.moveCard(this.id)">` +
								`<img class="item_button" src="assets/button_bad.png" alt="" id="bad" onclick="exercise.moveCard(this.id)">` +
								`<img class="item_button" src="assets/button_well.png" alt="" id="well" onclick="exercise.moveCard(this.id)">` +
								`<img class="item_button" src="assets/button_good.png" alt="" id="good" onclick="exercise.moveCard(this.id)">` +
								`<img class="item_button" src="assets/button_vgood.png" alt="" id="vgood" onclick="exercise.moveCard(this.id)">` +
							`</div>` +
						`</div>`;
	}
	moveCard(remember) {
		let temp3 = new Temp
		temp3.clearTemp()
		let path = require("path")
		this.updateCard()
		let newPlaceCoefficient
		// посчитать кол-во папок карточек N
		let cardsDirs = this.directories.getAllDirs(this.deckPath)
		let numOfCards = cardsDirs.length
		let newPlacement
		switch(remember) {
			case 'vbad':
				newPlacement = Math.trunc(numOfCards * 0.2 - 1) // через 1
				console.log('very bad, moving card to ' + newPlacement)
				break;
			case 'bad':
				newPlacement = Math.trunc(numOfCards * 0.4 - 1) // ~ на 30%
				console.log('bad, moving card to ' + newPlacement)
				break;
			case 'well':
				newPlacement = Math.trunc(numOfCards * 0.6 - 1) // ~ на 60%
				console.log('well, moving card to ' + newPlacement)
				break;
			case 'good':
				newPlacement = Math.trunc(numOfCards * 0.8 - 1) // ~ на 90%
				console.log('good, moving card to ' + newPlacement)
				break;
			case 'vgood':
				newPlacement = Math.trunc(numOfCards - 1) // в конец
				console.log('very good, moving card to ' + newPlacement)
				break;
		}
		this.directories.renameDir(this.cardPath, this.path.join(this.deckPath, "n" + newPlacement))
		let dir = this.fs.opendirSync(this.deckPath)
		let dirent
		let tmp_name
		let changeNameCounter = 0
		while ((dirent = dir.readSync()) !== null) {
			tmp_name = +dirent.name
			if (tmp_name <= newPlacement) {
				tmp_name--
				tmp_name = 'n' + tmp_name
				this.directories.renameDir(this.path.join(this.deckPath, dirent.name), this.path.join(this.deckPath, tmp_name))
				console.log(this.path.join(this.deckPath, dirent.name) + '->' + this.path.join(this.deckPath, tmp_name))
				changeNameCounter++
			}
		}
		dir.closeSync()
		dir = this.fs.opendirSync(this.deckPath)
		while ((dirent = dir.readSync()) !== null) {
			tmp_name = dirent.name
			if (dirent.name.substr(0, 1) == 'n') {
				tmp_name = dirent.name
				tmp_name = tmp_name.substr(1, tmp_name.length)
				this.directories.renameDir(this.path.join(this.deckPath, dirent.name), this.path.join(this.deckPath, tmp_name))
			}
		}
		dir.closeSync()
		this.removeBack()
		this.printFront()
	}
	removeFront() {
		document.getElementById("frontCardContent").remove()
		//document.getElementById("flipButton").remove()
		document.getElementById("flipButton").style.visibility = "hidden";
	}
	removeBack() {
		document.getElementById("backCardContent").remove()
		document.getElementById("rememberButtons").remove()
	}
}
let exercise = new Exercise
exercise.printFront()