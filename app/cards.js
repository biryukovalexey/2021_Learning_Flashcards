"use strict";
class Card {
	constructor() {
		this.directories = new Directories
		this.path = require('path')
		this.temp = new Temp
	}
}
class Card_t extends Card {
	constructor(f_text, b_text) {
		super()
		this.f_text = f_text
	}
}
class Card_t_t extends Card_t { // edit and delete test
	constructor(f_text, b_text) {
		super(f_text)
		this.b_text = b_text
	}
	writeToFiles(pathToCard) {
		let pathToFront = this.path.join(pathToCard, 'front')
		this.directories.makeDir(pathToFront)
		this.directories.rewriteTxt(this.path.join(pathToFront, 'text.txt'), this.f_text)
		let pathToBack = this.path.join(pathToCard, 'back')
		this.directories.makeDir(pathToBack)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text.txt'), this.b_text)
		let pathToInfo = this.path.join(pathToCard, 'info')
		this.directories.makeDir(pathToInfo)
		this.directories.rewriteTxt(this.path.join(pathToInfo, 'info.txt'), 't_t')	
	}
	printInputs(header, button) {
		document.getElementById("cardContent").remove()
		document.getElementById("cardContentDiv").innerHTML = '<p id="cardContent"></p>'
		document.getElementById("cardContent").innerHTML = document.getElementById("cardContent").innerHTML + '<p>' + header + '</p>' +
			'<p> Front text: <input type="text" id="f_t" name="fname"></p>' +
			'<p> Back text: <input type="text" id="b_t" name="fname"></p>' + 
			'<button type="button" id="confirmCardBtn" ' + button ;
	}
	printFront(pathToCard) {
		cardContent.innerHTML = cardContent.innerHTML + `<div id="frontCardContent"><p class='front_t_t'>` + 
		this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + `</p></div>`;
	}
	printBack(pathToCard) {
		cardContent.innerHTML = cardContent.innerHTML + `<div id="backCardContent"><p class='front_t_t'>` + 
		this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + `</p></div>`;
	}
	load(pathToCard) {
		this.f_text = this.directories.readOneLine(this.path.join(pathToCard, 'front', 'text.txt'), 0)
		this.b_text = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text.txt'), 0)
	}
	printCompact(pathToCard) {
		let editDeck = new EditDeck
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + 
		'<div class="front_t_t" style="margin-left: 5px;margin-bottom: 0;">' + 
		`<div id="frontCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + `</p><hr>` +
		`<div id="backCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '</p><hr><br>' +
					`<img style='margin-right: 20px;' src="assets/button_delete.png" alt=""class="item_button" id="deleteCard` + pathToCard + `" onclick="editDeck.deleteCard(this.id)">` +
					`<img style='margin-left: 20px;' src="assets/button_edit.png" alt=""class="item_button" id="editCard` + pathToCard + `" onclick="editDeck.goToEditCard(this.id)">` +
		` </div></div>`
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + '<br>'
		;
	}
}
class Card_t_tt extends Card_t_t {
	constructor(f_text, b_text, b_text1) {
		super(f_text, b_text)
		this.b_text1 = b_text1
	}
	writeToFiles(pathToCard) {
		let pathToFront = this.path.join(pathToCard, 'front')
		this.directories.makeDir(pathToFront)
		this.directories.rewriteTxt(this.path.join(pathToFront, 'text.txt'), this.f_text)
		let pathToBack = this.path.join(pathToCard, 'back')
		this.directories.makeDir(pathToBack)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text.txt'), this.b_text)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text1.txt'),this.b_text1)
		let pathToInfo = this.path.join(pathToCard, 'info')
		this.directories.makeDir(pathToInfo)
		this.directories.rewriteTxt(this.path.join(pathToInfo, 'info.txt'), 't_tt')
	}
	printInputs(header, button) {
		document.getElementById("cardContent").remove()
		document.getElementById("cardContentDiv").innerHTML = '<p id="cardContent"></p>'
		document.getElementById("cardContent").innerHTML = '<p>' + header + '</p>' + 
			'<p> Front text: <input type="text" id="f_t" name="fname"></p>' + 
			'<p> Back text: <input type="text" id="b_t" name="fname"></p>' + 
			'<p> Back text 2: <input type="text" id="b_t1" name="fname"></p>' + 
			'<button type="button" id="confirmCardBtn"' + button;
	}
	printFront(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div id="frontCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + `</p></div>`
	}
	printBack(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div id="backCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '<br><br>' +
				this.directories.readOneLine(this.path.join(pathToCard, "back", "text1.txt"), 0) + `</p>`
	}
	load(pathToCard) {
		this.f_text = this.directories.readOneLine(this.path.join(pathToCard, 'front', 'text.txt'), 0)
		this.b_text = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text.txt'), 0)
		this.b_text1 = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text1.txt'), 0)
	}
	printCompact(pathToCard) {
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + 
		'<div class="front_t_t" style="margin-left: 5px; margin-bottom: 0;">' + 
		`<div id="frontCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + `</p><hr>` +
		`<div id="backCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '<br><br>' +
				this.directories.readOneLine(this.path.join(pathToCard, "back", "text1.txt"), 0) + '</p><hr><br>' +
					`<img style='margin-right: 20px;' src="assets/button_delete.png" alt=""class="item_button" id="deleteCard` + pathToCard + `" onclick="editDeck.deleteCard(this.id)">` +
					`<img style='margin-left: 20px;' src="assets/button_edit.png" alt=""class="item_button" id="editCard` + pathToCard + `" onclick="editDeck.goToEditCard(this.id)">` +
		` </div></div>`
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + '<br>'
	}
}
class Card_tt_t extends Card_t_t {
	constructor(f_text, f_text1, b_text) {
		super(f_text, b_text)
		this.f_text1 = f_text1
	}
	writeToFiles(pathToCard) {
		let pathToFront = this.path.join(pathToCard, 'front')
		this.directories.makeDir(pathToFront)
		this.directories.rewriteTxt(this.path.join(pathToFront, 'text.txt'), this.f_text)
		this.directories.rewriteTxt(this.path.join(pathToFront, 'text1.txt'), this.f_text1)
		let pathToBack = this.path.join(pathToCard, 'back')
		this.directories.makeDir(pathToBack)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text.txt'), this.b_text)
		let pathToInfo = this.path.join(pathToCard, 'info')
		this.directories.makeDir(pathToInfo)
		this.directories.rewriteTxt(this.path.join(pathToInfo, 'info.txt'), 'tt_t')
	}
	printInputs(header, button) {
		document.getElementById("cardContent").remove()
		document.getElementById("cardContentDiv").innerHTML = '<p id="cardContent"></p>'
		document.getElementById("cardContent").innerHTML = document.getElementById("cardContent").innerHTML + '<p>' + header + '</p>' +
			'<p> Front text: <input type="text" id="f_t" name="fname"></p>' +
			'<p> Front text 2: <input type="text" id="f_t1" name="fname"></p>' +
			'<p> Back text: <input type="text" id="b_t" name="fname"></p>' + 
			'<button type="button" id="confirmCardBtn"' + button;
	}
	printFront(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div id="frontCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + '<br><br>' +
					this.directories.readOneLine(this.path.join(pathToCard, "front", "text1.txt"), 0) + '</p></div>';
	}
	printBack(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div id="backCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + `</p></div>`
	}
	load(pathToCard) {
		this.f_text = this.directories.readOneLine(this.path.join(pathToCard, 'front', 'text.txt'), 0)
		this.f_text1 = this.directories.readOneLine(this.path.join(pathToCard, 'front', 'text1.txt'), 0)
		this.b_text = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text.txt'), 0)
	}
	printCompact(pathToCard) {
				document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + 
		'<div class="front_t_t" style="margin-left: 5px; margin-bottom: 0;">' + 
		`<div id="frontCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + `<br><br>` + 
					this.directories.readOneLine(this.path.join(pathToCard, "front", "text1.txt"), 0) + `</p><hr>` +
		`<div id="backCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '</p><hr><br>' +
					`<img style='margin-right: 20px;' src="assets/button_delete.png" alt=""class="item_button" id="deleteCard` + pathToCard + `" onclick="editDeck.deleteCard(this.id)">` +
					`<img style='margin-left: 20px;' src="assets/button_edit.png" alt=""class="item_button" id="editCard` + pathToCard + `" onclick="editDeck.goToEditCard(this.id)">` +
		` </div></div>`
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + '<br>'
	}
}
class Card_tt_tt extends Card_tt_t {
	constructor(f_text, f_text1, b_text, b_text1) {
		super(f_text, f_text1, b_text)
		this.b_text1 = b_text1
	}
	writeToFiles(pathToCard) {
		let pathToFront = this.path.join(pathToCard, 'front')
		this.directories.makeDir(pathToFront)
		this.directories.rewriteTxt(this.path.join(pathToFront, 'text.txt'), this.f_text)
		this.directories.rewriteTxt(this.path.join(pathToFront, 'text1.txt'), this.f_text1)
		let pathToBack = this.path.join(pathToCard, 'back')
		this.directories.makeDir(pathToBack)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text.txt'), this.b_text)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text1.txt'), this.b_text1)
		let pathToInfo = this.path.join(pathToCard, 'info')
		this.directories.makeDir(pathToInfo)
		this.directories.rewriteTxt(this.path.join(pathToInfo, 'info.txt'), 'tt_tt')
	}
	printInputs(header, button) {
		cardContent.innerHTML = '<p>' + header + '</p>' +
			'<p> Front text: <input type="text" id="f_t" name="fname"></p>' +
			'<p> Front text 2: <input type="text" id="f_t1" name="fname"></p>' +
			'<p> Back text: <input type="text" id="b_t" name="fname"></p>' + 
			'<p> Back text 2: <input type="text" id="b_t1" name="fname"></p>' + 
			'<button type="button" id="confirmCardBtn"' + button;
	}
	printFront(pathToCard) {
					document.getElementById("cardContent").innerHTML = `<div id="frontCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + `<br><br>` + 
					this.directories.readOneLine(this.path.join(pathToCard, "front", "text1.txt"), 0) + `</p></div>`
	}
	printBack(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div id="backCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '<br><br>' +
				this.directories.readOneLine(this.path.join(pathToCard, "back", "text1.txt"), 0) + '</p></div>';
	}
	load(pathToCard) {
		this.f_text = this.directories.readOneLine(this.path.join(pathToCard, 'front', 'text.txt'), 0)
		this.f_text1 = this.directories.readOneLine(this.path.join(pathToCard, 'front', 'text1.txt'), 0)
		this.b_text = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text.txt'), 0)
		this.b_text1 = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text1.txt'), 0)
	}
	printCompact(pathToCard) {

		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + 
		'<div class="front_t_t" style="margin-left: 5px; margin-bottom: 0;">' + 
		`<div id="frontCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + `<br><br>` + 
					this.directories.readOneLine(this.path.join(pathToCard, "front", "text1.txt"), 0) + `</p><hr>` +
		`<div id="backCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '<br><br>' +
				this.directories.readOneLine(this.path.join(pathToCard, "back", "text1.txt"), 0) + '</p><hr><br>' +
					`<img style='margin-right: 20px;' src="assets/button_delete.png" alt=""class="item_button" id="deleteCard` + pathToCard + `" onclick="editDeck.deleteCard(this.id)">` +
					`<img style='margin-left: 20px;' src="assets/button_edit.png" alt=""class="item_button" id="editCard` + pathToCard + `" onclick="editDeck.goToEditCard(this.id)">` +
		` </div></div>`
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + '<br>'
	}
}
class Card_p extends Card{
	constructor(f_pic_path) {
		super()
		this.f_pic_path = f_pic_path
	}
}
class Card_p_t extends Card_p {
	constructor(f_pic_path, b_text) {
		super(f_pic_path)
		this.b_text = b_text
	}
	writeToFiles(pathToCard) {
		let pathToFront = this.path.join(pathToCard, 'front')
		this.directories.makeDir(pathToFront)
		let sourcePath = this.f_pic_path
		let picPath = this.path.join(pathToFront, 'picture' + this.path.extname(sourcePath))
		this.directories.copyFile(sourcePath, picPath)
		let pathToBack = this.path.join(pathToCard, 'back')
		this.directories.makeDir(pathToBack)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text.txt'), this.b_text)
		let pathToInfo = this.path.join(pathToCard, 'info')
		this.directories.makeDir(pathToInfo)
		this.directories.rewriteTxt(this.path.join(pathToInfo, 'info.txt'), 'p_t' + '\n' + this.path.extname(sourcePath))
	}
	printInputs(header, button, preview='<button type="button" onclick="addCard.previewPic()">Preview</button>') {
		document.getElementById("cardContent").remove()
		document.getElementById("cardContentDiv").innerHTML = '<p id="cardContent"></p>'
		document.getElementById("cardContent").innerHTML = document.getElementById("cardContent").innerHTML + '<p>' + header + '</p>' +
			'<p> Front picture: <input type="file" id="picSelect" accept="image/*" >' + preview + '</p>' +
			'<p> Back text: <input type="text" id="b_t" name="fname"></p>' + 
			'<button type="button" id="confirmCardBtn" ' + button ;
	}
	printFront(pathToCard) {
		
		document.getElementById("cardContent").innerHTML = `<div class="front_t_t" id="frontCardContent"><img class='front_pic' src="` + 
		this.temp.getPicPath(this.path.join(pathToCard, "front", "picture" + this.directories.readOneLine(this.path.join(pathToCard, "info", "info.txt"), 1))) + '" alt=""></div>';
	}
	printBack(pathToCard) {	
		document.getElementById("cardContent").innerHTML = `<div id="backCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '</p></div>';
	}
	load(pathToCard) {
		this.f_pic_path = this.path.join(pathToCard, 'front', 'text.txt')
		this.b_text = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text.txt'), 0)
	}
	printCompact(pathToCard) {

						document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + 
		'<div class="front_t_t" style="margin-left: 5px; margin-bottom: 0;">' + 
		`<div id="frontCardContent"><p class="p_compact">` + `<img  src="` + this.path.join(pathToCard, "front", "picture" + this.directories.readOneLine(this.path.join(pathToCard, "info", "info.txt"), 1)) + 
		`" alt="none" style="max-height:150px;"></p><hr>` +
		`<div id="backCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '</p><hr><br>' +
					`<img style='margin-right: 20px;' src="assets/button_delete.png" alt=""class="item_button" id="deleteCard` + pathToCard + `" onclick="editDeck.deleteCard(this.id)">` +
					`<img style='margin-left: 20px;' src="assets/button_edit.png" alt=""class="item_button" id="editCard` + pathToCard + `" onclick="editDeck.goToEditCard(this.id)">` +
		` </div></div>`
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + '<br>'
	}
}
class Card_p_tt extends Card_p_t {
	constructor(f_pic_path, b_text, b_text1) {
			super(f_pic_path, b_text)
			this.b_text1 = b_text1
		}
	writeToFiles(pathToCard) {
		let pathToFront = this.path.join(pathToCard, 'front')
		this.directories.makeDir(pathToFront)
		let sourcePath = this.f_pic_path
		let picPath = this.path.join(pathToFront, 'picture' + this.path.extname(sourcePath))
		this.directories.copyFile(sourcePath, picPath)
		let pathToBack = this.path.join(pathToCard, 'back')
		this.directories.makeDir(pathToBack)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text.txt'), this.b_text)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text1.txt'), this.b_text1)
		let pathToInfo = this.path.join(pathToCard, 'info')
		this.directories.makeDir(pathToInfo)
		this.directories.rewriteTxt(this.path.join(pathToInfo, 'info.txt'), 'p_tt' + '\n' + this.path.extname(sourcePath))
	}
		printInputs(header, button, preview='<button type="button" onclick="addCard.previewPic()">Preview</button>') {
		document.getElementById("cardContent").remove()
		document.getElementById("cardContentDiv").innerHTML = '<p id="cardContent"></p>'
		document.getElementById("cardContent").innerHTML = document.getElementById("cardContent").innerHTML + '<p>' + header + '</p>' +
			'<p> Front picture: <input type="file" id="picSelect" accept="image/*" >' + preview + '</p>' +
			'<p> Back text: <input type="text" id="b_t" name="fname"></p>' + 
			'<p> Back text 2: <input type="text" id="b_t1" name="fname"> </p>' +
			'<button type="button" id="confirmCardBtn" ' + button ;
	}
	printFront(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div class="front_t_t" id="frontCardContent"><img class='front_pic' src="` + this.temp.getPicPath(this.path.join(pathToCard, "front", "picture" + 
			this.directories.readOneLine(this.path.join(pathToCard, "info", "info.txt"), 1))) + '" alt=""></div>';
	}
	printBack(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div id="backCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '<br><br>' +
				this.directories.readOneLine(this.path.join(pathToCard, "back", "text1.txt"), 0) + '</p></div>';			
	}
	load(pathToCard) {
		this.f_pic_path = this.path.join(pathToCard, 'front', 'text.txt')
		this.b_text = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text.txt'), 0)
		this.b_text1 = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text1.txt'), 0)
	}
	printCompact(pathToCard) {

				document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + 
		'<div class="front_t_t" style="margin-left: 5px; margin-bottom: 0;">' + 
		`<div id="frontCardContent"><p class="p_compact">` + `<img  src="` + this.path.join(pathToCard, "front", "picture" + this.directories.readOneLine(this.path.join(pathToCard, "info", "info.txt"), 1)) + 
		`" alt="none" style="max-height:150px;"></p><hr>` +
		`<div id="backCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '<br><br>' +
				this.directories.readOneLine(this.path.join(pathToCard, "back", "text1.txt"), 0) + '</p><hr><br>' +
					`<img style='margin-right: 20px;' src="assets/button_delete.png" alt=""class="item_button" id="deleteCard` + pathToCard + `" onclick="editDeck.deleteCard(this.id)">` +
					`<img style='margin-left: 20px;' src="assets/button_edit.png" alt=""class="item_button" id="editCard` + pathToCard + `" onclick="editDeck.goToEditCard(this.id)">` +
		` </div></div>`
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + '<br>'
	}
}
class Card_pt_t extends Card_p_t {
	constructor(f_pic_path, f_text, b_text) {
			super(f_pic_path, b_text)
			this.f_text = f_text
		}
	writeToFiles(pathToCard) {
		let pathToFront = this.path.join(pathToCard, 'front')
		this.directories.makeDir(pathToFront)
		let sourcePath = this.f_pic_path
		let picPath = this.path.join(pathToFront, 'picture' + this.path.extname(sourcePath))
		this.directories.copyFile(sourcePath, picPath)
		this.directories.rewriteTxt(this.path.join(pathToFront, 'text.txt'), this.f_text)
		let pathToBack = this.path.join(pathToCard, 'back')
		this.directories.makeDir(pathToBack)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text.txt'), this.b_text)
		let pathToInfo = this.path.join(pathToCard, 'info')
		this.directories.makeDir(pathToInfo)
		this.directories.rewriteTxt(this.path.join(pathToInfo, 'info.txt'), 'pt_t' + '\n' + this.path.extname(sourcePath))
	}
			printInputs(header, button, preview='<button type="button" onclick="addCard.previewPic()">Preview</button>') {
		document.getElementById("cardContent").remove()
		document.getElementById("cardContentDiv").innerHTML = '<p id="cardContent"></p>'
		document.getElementById("cardContent").innerHTML = document.getElementById("cardContent").innerHTML + '<p>' + header + '</p>' +
			'<p> Front picture: <input type="file" id="picSelect" accept="image/*" >' + preview + '</p>' +
			'<p> Front text: <input type="text" id="f_t" name="fname"></p>' +
			'<p> Back text: <input type="text" id="b_t" name="fname"></p>' + 
			'<button type="button" id="confirmCardBtn" ' + button ;
	}
	printFront(pathToCard) {	
		document.getElementById("cardContent").innerHTML = `<div class="front_t_t" id="frontCardContent"><img class='front_pic' src="` + this.temp.getPicPath(this.path.join(pathToCard, "front", "picture" + 
			this.directories.readOneLine(this.path.join(pathToCard, "info", "info.txt"), 1))) + '" alt=""><p style="margin: 0; margin-top: 10px;">' + 
					this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + '</p></div>';

	}
	printBack(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div id="backCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '</p></div>';	
	}
	load(pathToCard) {
		this.f_pic_path = this.path.join(pathToCard, 'front', 'text.txt')
		this.f_text = this.directories.readOneLine(this.path.join(pathToCard, 'front', 'text.txt'), 0)
		this.b_text = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text.txt'), 0)
	}
	printCompact(pathToCard) {
				document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + 
		'<div class="front_t_t" style="margin-left: 5px; margin-bottom: 0;">' + 
		`<div id="frontCardContent"><p class="p_compact">` + `<img  src="` + this.path.join(pathToCard, "front", "picture" + this.directories.readOneLine(this.path.join(pathToCard, "info", "info.txt"), 1)) + 
		`" alt="none" style="max-height:150px;">` + `<br><br>` + 
					this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + `</p><hr>` +
		`<div id="backCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '</p><hr><br>' +
					`<img style='margin-right: 20px;' src="assets/button_delete.png" alt=""class="item_button" id="deleteCard` + pathToCard + `" onclick="editDeck.deleteCard(this.id)">` +
					`<img style='margin-left: 20px;' src="assets/button_edit.png" alt=""class="item_button" id="editCard` + pathToCard + `" onclick="editDeck.goToEditCard(this.id)">` +
		` </div></div>`
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + '<br>'
	}
}
class Card_pt_tt extends Card_pt_t {
	constructor(f_pic_path, f_text, b_text, b_text1) {
			super(f_pic_path, f_text, b_text)
			this.b_text1 = b_text1
		}
	writeToFiles(pathToCard) {
		let pathToFront = this.path.join(pathToCard, 'front')
		this.directories.makeDir(pathToFront)
		let sourcePath = this.f_pic_path
		let picPath = this.path.join(pathToFront, 'picture' + this.path.extname(sourcePath))
		this.directories.copyFile(sourcePath, picPath)
		this.directories.rewriteTxt(this.path.join(pathToFront, 'text.txt'), this.f_text)
		let pathToBack = this.path.join(pathToCard, 'back')
		this.directories.makeDir(pathToBack)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text.txt'), this.b_text)
		this.directories.rewriteTxt(this.path.join(pathToBack, 'text1.txt'), this.b_text1)
		let pathToInfo = this.path.join(pathToCard, 'info')
		this.directories.makeDir(pathToInfo)
		this.directories.rewriteTxt(this.path.join(pathToInfo, 'info.txt'), 'pt_tt' + '\n' + this.path.extname(sourcePath))
	}
			printInputs(header, button, preview='<button type="button" onclick="addCard.previewPic()">Preview</button>') {
		document.getElementById("cardContent").remove()
		document.getElementById("cardContentDiv").innerHTML = '<p id="cardContent"></p>'
		document.getElementById("cardContent").innerHTML = document.getElementById("cardContent").innerHTML + '<p>' + header + '</p>' +
			'<p> Front picture: <input type="file" id="picSelect" accept="image/*" >' + preview + '</p>' +
			'<p> Front text: <input type="text" id="f_t" name="fname"></p>' +
			'<p> Back text: <input type="text" id="b_t" name="fname"></p>' + 
			'<p> Back text 2: <input type="text" id="b_t1" name="fname"> </p>' +
			'<button type="button" id="confirmCardBtn" ' + button ;
	}
	printFront(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div class="front_t_t" id="frontCardContent"><img class='front_pic' src="` + this.temp.getPicPath(this.path.join(pathToCard, "front", "picture" + 
			this.directories.readOneLine(this.path.join(pathToCard, "info", "info.txt"), 1))) + '" alt=""><p style="margin: 0; margin-top: 10px;">' + 
					this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + '</p></div>';
	}
	printBack(pathToCard) {
		document.getElementById("cardContent").innerHTML = `<div id="backCardContent"><p class='front_t_t'>` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '<br><br>' +
			this.directories.readOneLine(this.path.join(pathToCard, "back", "text1.txt"), 0) + '</p></div>';
	}
	load(pathToCard) {
		this.f_pic_path = this.path.join(pathToCard, 'front', 'text.txt')
		this.f_text = this.directories.readOneLine(this.path.join(pathToCard, 'front', 'text.txt'), 0)
		this.b_text = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text.txt'), 0)
		this.b_text1 = this.directories.readOneLine(this.path.join(pathToCard, 'back', 'text1.txt'), 0)
	}
	printCompact(pathToCard) {
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + 
		'<div class="front_t_t" style="margin-left: 5px; margin-bottom: 0;">' + 
		`<div id="frontCardContent"><p class="p_compact">` + `<img  src="` + this.path.join(pathToCard, "front", "picture" + this.directories.readOneLine(this.path.join(pathToCard, "info", "info.txt"), 1)) + 
		`" alt="none" style="max-height:150px;">` + `<br><br>` + 
					this.directories.readOneLine(this.path.join(pathToCard, "front", "text.txt"), 0) + `</p><hr>` +
		`<div id="backCardContent"><p class="p_compact">` + this.directories.readOneLine(this.path.join(pathToCard, "back", "text.txt"), 0) + '<br><br>' +
				this.directories.readOneLine(this.path.join(pathToCard, "back", "text1.txt"), 0) + '</p><hr><br>' +
					`<img style='margin-right: 20px;' src="assets/button_delete.png" alt=""class="item_button" id="deleteCard` + pathToCard + `" onclick="editDeck.deleteCard(this.id)">` +
					`<img style='margin-left: 20px;' src="assets/button_edit.png" alt=""class="item_button" id="editCard` + pathToCard + `" onclick="editDeck.goToEditCard(this.id)">` +
		` </div></div>`
		document.getElementById("cardsList").innerHTML = document.getElementById("cardsList").innerHTML + '<br>'
	}
}