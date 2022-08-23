class EditCard {
	constructor() {
		this.cardContent = document.getElementById("cardContent")
		this.path = require('path')
		this.cardType
		this.directories = new Directories
		this.cardPath
	}
	previewPic() {
		const fs = require('fs')
		document.getElementById("picPreviewContent").remove()
		let sourcePath = document.getElementById("picSelect").value
		let picPath = this.pathpath.join('tmp', 'pic' + Date.now() + this.pathpath.extname(sourcePath))
		picPath = this.pathpath.resolve(picPath)
		this.directories.copyFile(sourcePath, picPath)
		console.log('copied to tmp');
		sleep(1000)
		document.getElementById("picPreview").innerHTML = '<div id="picPreviewContent" ><img src="' + 
		picPath + '" alt="none" style="max-height:720px;"></div>'
		this.directories.deleteDir(picPath)
	}
	pickType(cardId) {
		this.cardPath = this.path.join(getCookie('usersPath'), getCookie("user"), "decks", getCookie("deck"), "cards", cardId+'')		
		this.cardType = this.directories.readOneLine(this.path.join(getCookie('usersPath'), getCookie("user"), "decks", getCookie("deck"), "cards", cardId+'' , "info",  "info.txt"), 0)
		switch (this.cardType) {
			case 't_t':
				this.newCard = new Card_t_t;
				break;
			case 't_tt':
				this.newCard = new Card_t_tt;
				break;
			case 'tt_t':
				this.newCard = new Card_tt_t;
				break;
			case 'tt_tt':
				this.newCard = new Card_tt_tt;
				break;
			case 'p_t':
				this.newCard = new Card_p_t;
				break;
			case 'p_tt':
				this.newCard = new Card_p_tt;
				break;
			case 'pt_t':
				this.newCard = new Card_pt_t;
				break;
			case 'pt_tt':
				this.newCard = new Card_pt_tt;
				break;
		}
		this.newCard.printFront(this.cardPath);
		this.newCard.printBack(this.cardPath);
		this.newCard.printInputs('Make changes:', 'onclick="editCard.confirmCard()">Apply changes</button>', ''); //nen
	}
	confirmCard() {
		let directories = new Directories;
		const fs = require('fs')
		const path = require('path')
		switch (this.cardType) {
			case 't_t':
				this.newCard.f_text = this.directories.readOneLine(this.path.join(this.cardPath, "front",  "text.txt"), 0)
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text.txt"), 0)
				if (document.getElementById("f_t").value != '') this.newCard.f_text = document.getElementById("f_t").value
				if (document.getElementById("b_t").value != '') this.newCard.b_text = document.getElementById("b_t").value
				break;
			case 't_tt':
				this.newCard.f_text = this.directories.readOneLine(this.path.join(this.cardPath, "front",  "text.txt"), 0)
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text.txt"), 0)
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text1.txt"), 0)
				if (document.getElementById("f_t").value != '') this.newCard.f_text = document.getElementById("f_t").value
				if (document.getElementById("b_t").value != '') this.newCard.b_text = document.getElementById("b_t").value
				if (document.getElementById("b_t1").value != '') this.newCard.b_text1 = document.getElementById("b_t1").value
				break;
			case 'tt_t':
				this.newCard.f_text = this.directories.readOneLine(this.path.join(this.cardPath, "front",  "text.txt"), 0)
				this.newCard.f_text = this.directories.readOneLine(this.path.join(this.cardPath, "front",  "text1.txt"), 0)
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text.txt"), 0)
				if (document.getElementById("f_t").value != '') this.newCard.f_text = document.getElementById("f_t").value
				if (document.getElementById("f_t1").value != '') this.newCard.f_text1 = document.getElementById("f_t1").value
				if (document.getElementById("b_t").value != '') this.newCard.b_text = document.getElementById("b_t").value
				break;
			case 'tt_tt':
				this.newCard.f_text = this.directories.readOneLine(this.path.join(this.cardPath, "front",  "text.txt"), 0)
				this.newCard.f_text = this.directories.readOneLine(this.path.join(this.cardPath, "front",  "text1.txt"), 0)
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text.txt"), 0)
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text1.txt"), 0)
				if (document.getElementById("f_t").value != '') this.newCard.f_text = document.getElementById("f_t").value
				if (document.getElementById("f_t1").value != '') this.newCard.f_text1 = document.getElementById("f_t1").value
				if (document.getElementById("b_t").value != '') this.newCard.b_text = document.getElementById("b_t").value
				if (document.getElementById("b_t1").value != '') this.newCard.b_text1 = document.getElementById("b_t1").value
				break;
			case 'p_t':
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text.txt"), 0)
				if (document.getElementById("picSelect").value != '') this.newCard.f_pic_path = document.getElementById("picSelect").value
				if (document.getElementById("b_t").value != '') this.newCard.b_text = document.getElementById("b_t").value
				break;
			case 'p_tt':
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text.txt"), 0)
				this.newCard.b_text1 = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text1.txt"), 0)
				if (document.getElementById("picSelect").value != '') this.newCard.f_pic_path = document.getElementById("picSelect").value
				if (document.getElementById("b_t").value != '') this.newCard.b_text = document.getElementById("b_t").value
				if (document.getElementById("b_t1").value != '') this.newCard.b_text1 = document.getElementById("b_t1").value
				break;
			case 'pt_t':
				this.newCard.f_text = this.directories.readOneLine(this.path.join(this.cardPath, "front",  "text.txt"), 0)
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text.txt"), 0)
				if (document.getElementById("picSelect").value != '') this.newCard.f_pic_path = document.getElementById("picSelect").value
				if (document.getElementById("f_t").value != '') this.newCard.f_text = document.getElementById("f_t").value
				if (document.getElementById("b_t").value != '') this.newCard.b_text = document.getElementById("b_t").value
				break;
			case 'pt_tt':
				this.newCard.f_text = this.directories.readOneLine(this.path.join(this.cardPath, "front",  "text.txt"), 0)
				this.newCard.b_text = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text.txt"), 0)
				this.newCard.b_text1 = this.directories.readOneLine(this.path.join(this.cardPath, "back",  "text1.txt"), 0)
				if (document.getElementById("picSelect").value != '') this.newCard.f_pic_path = document.getElementById("picSelect").value
				if (document.getElementById("f_t").value != '') this.newCard.f_text = document.getElementById("f_t").value
				if (document.getElementById("b_t").value != '') this.newCard.b_text = document.getElementById("b_t").value
				if (document.getElementById("b_t1").value != '') this.newCard.b_text1 = document.getElementById("b_t1").value
				break;
		}
		this.newCard.writeToFiles(this.cardPath, this.newCard.f_text, this.newCard.b_text)
		alert('done!')
		window.location.href = "../views/editDeck.html"
	}
}