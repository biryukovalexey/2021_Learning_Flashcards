class AddCard {
	constructor() {
		this.cardContent = document.getElementById("cardContent")
		this.directories = new Directories
		this.path = require("path")
		this.fs = require("fs")
	}
	previewPic() {
		document.getElementById("picPreviewContent").remove()
		let sourcePath = document.getElementById("picSelect").value
		let picPath = this.path.join('views','tmp', 'pic' + Date.now() + this.path.extname(sourcePath))
		picPath = this.path.resolve(picPath)
		this.directories.copyFile(sourcePath, picPath)
		sleep(1000)
		console.log('copied to tmp');
		document.getElementById("picPreview").innerHTML = '<div id="picPreviewContent" ><img src="' + 
		picPath + '" alt="none" style="max-height:720px;"></div>'
		this.directories.deleteDir(picPath)
	}
	pickType(cardType) {	
		switch (cardType) {
			case 't_t':
				this.newCard = new Card_t_t;
				this.cardType = 't_t'
				break;
			case 't_tt':
				this.newCard = new Card_t_tt;
				this.cardType = 't_tt'
				break;
			case 'tt_t':
				this.newCard = new Card_tt_t;
				this.cardType = 'tt_t'
				break;
			case 'tt_tt':
				this.newCard = new Card_tt_tt;
				this.cardType = 'tt_tt'
				break;
			case 'p_t':
				this.newCard = new Card_p_t;
				this.cardType = 'p_t'
				break;
			case 'p_tt':
				this.newCard = new Card_p_tt;
				this.cardType = 'p_tt'
				break;
			case 'pt_t':
				this.newCard = new Card_pt_t;
				this.cardType = 'pt_t'
				break;
			case 'pt_tt':
				this.newCard = new Card_pt_tt;
				this.cardType = 'pt_tt'
				break;
		}
		this.newCard.printInputs('Input content:',  'onclick="addCard.confirmCard()">Create</button>', '');
	}
	confirmCard() {
		let pathToCards = this.path.join(getCookie('usersPath'), getCookie("user"), "decks", getCookie("deck"), "cards")
		let dir = this.fs.opendirSync(pathToCards)
		let dirent
		let tmp_name
		while ((dirent = dir.readSync()) !== null) {
			tmp_name = +dirent.name
			tmp_name++
			tmp_name = 'n' + tmp_name
			this.directories.renameDir(this.path.join(pathToCards, dirent.name), this.path.join(pathToCards, tmp_name))
		}
		dir.closeSync()
		dir = this.fs.opendirSync(pathToCards)
		while ((dirent = dir.readSync()) !== null) {
			tmp_name = dirent.name
			tmp_name = tmp_name.substr(1, tmp_name.length)
			this.directories.renameDir(this.path.join(pathToCards, dirent.name), this.path.join(pathToCards, tmp_name))
		}
		dir.closeSync()
		let pathToCard = this.path.join(pathToCards, '0')
		this.directories.makeDir(pathToCard)
		switch (this.cardType) { 
					case 't_t':
						this.newCard.f_text = document.getElementById("f_t").value
						this.newCard.b_text = document.getElementById("b_t").value
						break;
					case 't_tt':
						this.newCard.f_text = document.getElementById("f_t").value
						this.newCard.b_text = document.getElementById("b_t").value
						this.newCard.b_text1 = document.getElementById("b_t1").value
						break;
					case 'tt_t':
						this.newCard.f_text = document.getElementById("f_t").value
						this.newCard.f_text1 = document.getElementById("f_t1").value
						this.newCard.b_text = document.getElementById("b_t").value
						break;
					case 'tt_tt':
						this.newCard.f_text = document.getElementById("f_t").value
						this.newCard.f_text1 = document.getElementById("f_t1").value
						this.newCard.b_text = document.getElementById("b_t").value
						this.newCard.b_text1 = document.getElementById("b_t1").value
						break;
					case 'p_t':
						this.newCard.f_pic_path = document.getElementById("picSelect").value
						this.newCard.b_text = document.getElementById("b_t").value
						break;
					case 'p_tt':
						this.newCard.f_pic_path = document.getElementById("picSelect").value
						
						this.newCard.b_text = document.getElementById("b_t").value
						this.newCard.b_text1 = document.getElementById("b_t1").value
						break;
					case 'pt_t':
						this.newCard.f_pic_path = document.getElementById("picSelect").value
						this.newCard.f_text = document.getElementById("f_t").value
						this.newCard.b_text = document.getElementById("b_t").value
						break;
					case 'pt_tt':
						this.newCard.f_pic_path = document.getElementById("picSelect").value
						this.newCard.f_text = document.getElementById("f_t").value
						this.newCard.b_text = document.getElementById("b_t").value
						this.newCard.b_text1 = document.getElementById("b_t1").value
						break;
				}
		this.newCard.writeToFiles(pathToCard)
		alert('card created!')
		console.log('card created!')
			}
}