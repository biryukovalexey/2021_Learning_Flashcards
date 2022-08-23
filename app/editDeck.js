"use strict";
class EditDeck {
	constructor() {
		this.deckList = new DeckList
		this.hasDeckPic = true
		this.newPicPath = ''
		this.fs = require("fs")
		this.path = require("path")
		this.deckPath = this.path.join(getCookie('usersPath'), getCookie('user'), 'decks', getCookie('deck'))
		this.derectories = new Directories
		this.temp = new Temp
	}
	printDeckPic() {
		let path = require("path")
		let fs = require('fs')
		let deckPicPath = path.join(getCookie('usersPath'), getCookie('user'), 'decks', getCookie('deck'), 'info', 'deckPic.jpg')
		if (!fs.existsSync(deckPicPath)) {
			this.hasDeckPic = false
			deckPicPath = path.resolve('assets')
			deckPicPath = path.join(deckPicPath, 'defaultDeckPic.jpg')
		}
		document.getElementById("deckPic").innerHTML = '<img id="deckPicContent" src="' + deckPicPath + '" alt="pic" style="height:256px; width:256px;border-radius: 300px; image-rendering: -webkit-optimize-contrast;">'
	}
	previewDeckPic() {		
		this.newPicPath = document.getElementById("picSelect").value 
		if (this.newPicPath == '') {
			alert('No picture selected!')
		} else {
			document.getElementById("deckPicContent").remove()
			document.getElementById("deckPic").innerHTML = '<img id="deckPicContent" src="' + this.temp.getPicPath(this.newPicPath) + '" alt="pic" style="height:256px; width:256px;border-radius: 300px; image-rendering: -webkit-optimize-contrast;">'
		}
	}
	updateCard(cardType, cardPath) {
		switch (cardType) {
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
		this.currentCard.load(cardPath)
	}
	printCards() {
		const { lstatSync, readdirSync } = require('fs')
	  	const { join } = require('path')
	  	let fs = require("fs");
	  	let path = require("path");
		const isDirectory = source => lstatSync(source).isDirectory()
		const getDirectories = source =>
		  readdirSync(source).map(name => join(source, name)).filter(isDirectory)
		let cardsPath = path.join(getCookie('usersPath'), getCookie('user'), "decks", getCookie('deck'), 'cards')
		let cardsDirsArr = getDirectories(cardsPath)
		let name_tmp
		let pathToInfo
		let directories = new Directories
		if (cardsDirsArr.length == 0) {
			document.getElementById("Cards_message").innerHTML = '<p style="width:550px; margin-left: 95px; padding-top: 30px;">there are no cards in the deck!<p>'
		} else {
				for (let i of cardsDirsArr) {
				pathToInfo = path.join(i, 'info', 'info.txt')
				name_tmp = path.basename(i)
				let cardType = directories.readOneLine(pathToInfo, 0)
				this.updateCard(cardType, i)
				this.currentCard.printCompact(i)
				}
			}
		}
		goToEditCard(pathToCard) {
			let path = require("path")
			let fs = require('fs')
			let directories = new Directories
			let cardPath = pathToCard.substr(10, pathToCard.length)
			let cardId = directories.getLastFolder(cardPath)
			setCookie("card", cardId)
			window.location.href = "../views/editCard.html"
		}
		deleteCard(pathToCard) {
			let path = require("path")
			let fs = require('fs')
			let directories = new Directories
			let cardPathDelete = pathToCard.substr(10, pathToCard.length)
			let deletedCardId = directories.getLastFolder(cardPathDelete)
			if (confirm('Are you sure to delete this card?')) {
				directories.deleteDir(cardPathDelete)
				let cardsDir = path.join(this.deckPath, 'cards')
				let dirent
				let dir = this.fs.opendirSync(cardsDir)
				let newName
				while ((dirent = dir.readSync()) !== null) {
					newName = +dirent.name
					if (newName > deletedCardId) {
						newName--
						newName += ''
						directories.renameDir(this.path.join(cardsDir, dirent.name), this.path.join(cardsDir, newName))
					}
				}
				dir.closeSync()
				alert('Card deleted')
				window.location.href = "../views/editDeck.html"
			}
		}
		confirmChanges() {
			let path = require("path")
			let fs = require('fs')
			let directories = new Directories
			let newPicPath = document.getElementById("picSelect").value
			if (newPicPath != '') {
				console.log(1)
				if (this.hasDeckPic) {
					fs.unlinkSync(path.join(getCookie('usersPath'), getCookie('user'), 'decks', getCookie('deck'), 'info', 'deckPic.jpg'))
				}
				directories.copyFile(newPicPath, path.join(getCookie('usersPath'), getCookie('user'), 'decks', getCookie('deck'), 'info', 'deckPic.jpg') )
			}
			if (document.getElementById("newNameInput").value != '') {
				alert('done')
				console.log(2)
				let newDeckPath = path.join(getCookie('usersPath'), getCookie('user'), 'decks', document.getElementById("newNameInput").value)
					if (fs.existsSync(newDeckPath)) {
						alert(document.getElementById("newNameInput").value + ' is already taken!')
					}
					else {
						directories.renameDir(path.join(getCookie('usersPath'), getCookie('user'), 'decks', getCookie('deck')), newDeckPath)
					}
			}
			else {alert('done')}
			window.location.href = "../views/decks.html";
		}
}