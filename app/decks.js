"use strict";
class Deck {
	constructor(id, name, lastOpen) {
		this.id = id;
		this.name = name;
		this.lastOpen = lastOpen;
		this.temp = new Temp;
	}
	log() {
		console.log( 'id: '+ this.id + ', name:' + this.name + ', lastOpen:' + this.lastOpen);
	}
	print() {
		let path = require("path")
		let fs = require('fs')
		let deckPicPath = path.join(getCookie('usersPath'), getCookie('user'), 'decks', this.name, 'info', 'deckPic.jpg')
		if (fs.existsSync(deckPicPath)) deckPicPath = this.temp.getPicPath(deckPicPath)
		let fullPicPath = path.join(getCookie('usersPath'), getCookie('user'), 'decks', this.name, 'info', 'deckPic.jpg')
		if (!fs.existsSync(fullPicPath)) {
			deckPicPath = 'assets'
			if (isDev()) deckPicPath = path.resolve(deckPicPath)
			deckPicPath = path.join(deckPicPath, 'defaultDeckPic.jpg')
		}
		document.write('<div class="item" id="deckDiv' + this.id + '">' +
					'<img src="' + deckPicPath + '" alt="pic" class="item_img">' +
					'<p class="item_name">' + this.name + '</p>' +
					'<div class="item_buttons">' +
						'<img class="item_button" id="exercise' + this.id + '" src="assets/button_exercise.png" alt="" onclick="decksArr.exerciseDeck(this.id)">' +
						'<img class="item_button" id="addCard' + this.id + '" src="assets/button_plus.png" alt="" onclick="decksArr.addCard(this.id)">' +
						'<img class="item_button" id="editDeck' + this.id + '" src="assets/button_edit.png" alt="" onclick="decksArr.editDeck(this.id)">' +
					'</div>' +			
				'</div>' +
				'<br>')
	}
}
class DeckList extends IdGenerator {
	constructor() {
		super();
		this.arrayOfDecks = [];
	}
	addRAM(id, name, lastOpen) {
		let deck = new Deck(id, name, lastOpen);
		this.arrayOfDecks.push(deck);
	}
	addStorage(id, deckName, lastOpen) {
		let path = require("path");
		let deckPath = path.join(getCookie('usersPath'), getCookie('user'), "decks", deckName)
		let directories = new Directories
		directories.makeDir(deckPath)
		directories.makeDir(path.join(deckPath, 'cards'))
		directories.makeDir(path.join(deckPath, 'info')) 
		let content = id + '\n' + lastOpen // content to write to file
		directories.rewriteTxt(path.join(deckPath, 'info', 'info.txt'), content)
	}
	getDeckName(idClicked) {
		let deckObjToDel = this.arrayOfDecks.find(o => o.id == idClicked);
		return deckObjToDel.name;
	}
	updateStorage(id, lastOpen) {
		let deckName = this.getDeckName(id)
		let path = require("path")
		let directories = new Directories
		let deckPath = path.join(getCookie('usersPath'), getCookie('user'), "decks", deckName)
		let content = id + '\n' + lastOpen // content to write to file
		directories.rewriteTxt(path.join(deckPath, 'info', 'info.txt'), content)
	}
addNewDeck(deckName, deckPicPath) {
		let id = this.newID();
		let openTime = Date.now();
		this.addRAM(id, deckName, openTime)
		this.addStorage(id, deckName, openTime)
		if (deckPicPath != '') {
			let directories = new Directories
			let path = require("path")
			directories.copyFile(deckPicPath, path.join(getCookie('usersPath'), getCookie('user'), 'decks', deckName, 'info', 'deckPic.jpg'))
		}
		setCookie('deck', deckName)
		window.location.href = "../views/pickCardType.html";
	}
	deleteDeck(deckName) {
			let path = require("path");
			let folder = path.join(getCookie('usersPath'), getCookie('user'), 'decks', getCookie('deck'))
			let directories = new Directories
			let fs = require("fs");
			directories.deleteDir(folder)
	}
	log() {
		console.log('==== DECKS: ====');
		for (let i of this.arrayOfDecks) {
			i.log();
		}
		console.log('================');
	}
	isDeckDataCorrupted(path) {
		let result = false;
		let fs = require("fs");
		if (fs.existsSync(path)) {
    		console.log('Found deck info file in ' + path);
		} else { result = true; }
		return result;
	}
	load() {
		const { lstatSync, readdirSync } = require('fs')
	  	const { join } = require('path')
	  	let fs = require("fs");
	  	let path = require("path");
		const isDirectory = source => lstatSync(source).isDirectory()
		const getDirectories = source =>
		  readdirSync(source).map(name => join(source, name)).filter(isDirectory)
		let decksPath = path.join(getCookie('usersPath'), userNameSession, "decks")
		let decksDirsArr = getDirectories(decksPath)
		let id_tmp
		let name_tmp
		let date_tmp
		let lineCounter
		let pathToInfo
		this.arrayOfDecks.length = 0
		this.resetID()
		let directories = new Directories
		for (let i of decksDirsArr) {
		  pathToInfo = path.join(i, 'info', 'info.txt')
		  name_tmp = path.basename(i)
		  if (this.isDeckDataCorrupted(pathToInfo) == true) {
		  	console.log('Error: data of deck "' + name_tmp + '"" is corrupted and will be ignored');
		  } else {
		  lineCounter = 0
		  id_tmp = directories.readOneLine(pathToInfo, lineCounter)
		  this.setID(id_tmp);		 
		  lineCounter++;
		  date_tmp = directories.readOneLine(pathToInfo, lineCounter)
		  lineCounter++;
		  this.addRAM(id_tmp, name_tmp, date_tmp)
		}
		}
		this.arrayOfDecks.sort((a,b) => (a.lastOpen < b.lastOpen) ? 1 : ((b.lastOpen < a.lastOpen) ? -1 : 0))
	}
	print() {
		for (let i of this.arrayOfDecks) {
			i.print();
		}
	}
	exerciseDeck(btnId) {
		let idClicked = btnId.substr(8, btnId.length)
		let deckName = this.getDeckName(idClicked)
		let path = require("path")
		let fs = require('fs')
		let tempPath = path.join(getCookie('usersPath'), getCookie('user'), 'decks', deckName, 'cards', '0')
		if (fs.existsSync(tempPath)) {
			this.updateStorage(idClicked, Date.now())
			setCookie("deck", deckName)
			window.location.href = "../views/exercise.html";
		} else {
			alert('There are no cards in ' + deckName + '! Add cards to exercise this deck')
		}
	}
	addCard(btnId) {
		let idClicked = btnId.substr(7, btnId.length)
		let idClickedNum = +idClicked
		let deckName = this.getDeckName(idClicked)
		setCookie("deck", deckName)
		window.location.href = "../views/pickCardType.html";
	}
	editDeck(btnId) {
		let idClicked = btnId.substr(8, btnId.length)
		let idClickedNum = +idClicked
		let deckName = this.getDeckName(idClicked)
		setCookie("deck", deckName)
		window.location.href = "../views/editDeck.html";
	}
	goToNewDeckPage() {
		window.location.href = "../views/newDeck.html";
	}
}