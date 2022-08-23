"use strict";
class NewDeck {
	constructor() {
		this.newPicPath = ''
		this.deckName = ''
	}
	previewDeckPic() {		
		this.newPicPath = document.getElementById("picSelect").value
		if (this.newPicPath == '') {
			alert('No picture selected!')
		} else {
			document.getElementById("deckPicContent").remove()
			document.getElementById("deckPic").innerHTML = '<img id="deckPicContent" src="' + this.newPicPath + '" alt="pic" style="height:256px; width:256px; image-rendering: -webkit-optimize-contrast;">'
		}
	}
	confirm() {
			let decks = new DeckList
			let directories = new Directories
			let path = require("path")
			let fs = require('fs')
			this.deckName = document.getElementById("newNameInput").value
			let newDeckPath = path.join(getCookie('usersPath'), getCookie('user'), "decks", this.deckName)
			if ((fs.existsSync(newDeckPath)) && (this.deckName != '')) {
				alert(this.deckName + ' is already taken!')
			} else {
				if (this.deckName == '') {
					alert('Enter name!')
				} else {
					this.newPicPath = document.getElementById("picSelect").value
						decks.addNewDeck(this.deckName, this.newPicPath)
				}
			}
		}
}