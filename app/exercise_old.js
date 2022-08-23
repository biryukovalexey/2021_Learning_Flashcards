"use strict";
class Exercise {
	constructor() {
		let path = require("path")
		this.deckName = getCookie("deck")
		this.deckPath = path.join(getCookie('usersPath'), getCookie("user"), "decks", getCookie("deck"), "cards")
		this.cardPath = path.join(deckPath_tmp, "0")
		let directories = new Directories
		this.cardType = directories.readOneLine(path.join(this.cardPath, "info", "info.txt"), 0)
		this.cardContent = document.getElementById("cardContent");
		this.buttons = document.getElementById("buttons");
	}
	printFront() {
		let path = require("path")
		let directories = new Directories
		this.cardType = directories.readOneLine(path.join(this.cardPath, "info", "info.txt"), 0)
		let myPath
		let exttention
		switch(this.cardType) {
			case 't_t':
				let card_t_t = new Card_t_t()
				document.getElementById("cardContent").innerHTML = '<div id="frontCardContent">' + directories.readOneLine(path.join(this.cardPath, "front", "text.txt"), 0) + '</div>';
				break;
			case 't_tt':
			let card_t_tt = new Card_t_tt
				document.getElementById("cardContent").innerHTML = '<div id="frontCardContent">' + directories.readOneLine(path.join(this.cardPath, "front", "text.txt"), 0) + '</div>';
				break;
			case 'tt_t':
				document.getElementById("cardContent").innerHTML = '<div id="frontCardContent">' + directories.readOneLine(path.join(this.cardPath, "front", "text.txt"), 0) + 'br' + 
				directories.readOneLine(path.join(this.cardPath, "front", "text.txt"), 0) + '</div>';
				break;
			case 'tt_tt':
				document.getElementById("cardContent").innerHTML = '<div id="frontCardContent">' + directories.readOneLine(path.join(this.cardPath, "front", "text.txt"), 0) + 'br' + 
				directories.readOneLine(path.join(this.cardPath, "front", "text.txt"), 0) + '</div>';
				break;
			case 'p_t':
				myPath = path.join(this.cardPath, "front", "picture")
				exttention = 
				document.getElementById("cardContent").innerHTML = '<div id="frontCardContent">' + 
				'<img src="' path.join(this.cardPath, "front", "picture", directories.readOneLine(path.join(this.cardPath, "info", "info.txt"), 1)) + 
				'" alt="none" style="max-height:720px;"></div>';
				break;
			case 'p_tt':
				document.getElementById("cardContent").innerHTML = '<div id="frontCardContent">' + directories.readOneLine(path.join(this.cardPath, "front", "text.txt"), 0) + '</div>';
				break;
			case 'pt_t':
				document.getElementById("cardContent").innerHTML = '<div id="frontCardContent">' + directories.readOneLine(path.join(this.cardPath, "front", "text.txt"), 0) + '</div>';
				break;
			case 'pt_tt':
				document.getElementById("cardContent").innerHTML = '<div id="frontCardContent">' + directories.readOneLine(path.join(this.cardPath, "front", "text.txt"), 0) + '</div>';
				break;
		}
		this.buttons.innerHTML = '<button type="button" id="flipButton" onclick="exerciseCard.printBack()">Flip</button>'
	}
	printBack() {
		this.removeFront()
		let path = require("path")
		let directories = new Directories
		switch(this.cardType) {
			case 't_t':
				let card_t_t = new Card_t_t()
				document.getElementById("cardContent").innerHTML = '<div id="backCardContent">' + directories.readOneLine(path.join(this.cardPath, "back", "text.txt"), 0) + '</div>';
				break;
			case 't_tt':
			let card_t_tt = new Card_t_tt
				document.getElementById("cardContent").innerHTML = '<div id="backCardContent">' + directories.readOneLine(path.join(this.cardPath, "back", "text.txt"), 0) + '<br>' +
				directories.readOneLine(path.join(this.cardPath, "back", "text1.txt"), 0) + '</div>';
				break;
		}
		document.getElementById("buttons").innerHTML = '<div id="rememberButtons">' + 
		'<p>How well do you remember this card?</p>' +
		'<button type="button" id="flipButton" onclick="exerciseCard.moveCard("vbad")">Very bad</button>' +
		'<button type="button" id="flipButton" onclick="exerciseCard.moveCard("bad")">Bad</button>' +
		'<button type="button" id="flipButton" onclick="exerciseCard.moveCard("well")">Well</button>' +
		'<button type="button" id="flipButton" onclick="exerciseCard.moveCard("good")">Good</button>' +
		'<button type="button" id="flipButton" onclick="exerciseCard.moveCard("vgood")">Very good</button>' +
		'</div>';
	}
	moveCard(remember) {
		switch(remember) {
			case 'vbad':
				console.log('vbad');
				break;
			case 'bad':
				console.log('bad');
				break;
			case 'well':
				console.log('well');
				break;
			case 'good':
				console.log('good');
				break;
			case 'vgood':
				console.log('vgood');
				break;
		}
		this.removeBack()
		this.printFront()
	}
	removeFront() {
		document.getElementById("frontCardContent").remove()
		document.getElementById("flipButton").remove()
	}
	removeBack() {
		document.getElementById("backCardContent").remove()
		document.getElementById("rememberButtons").remove()
	}

}