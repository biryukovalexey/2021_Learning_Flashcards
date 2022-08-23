"use strict";
class User {
	constructor(id, name, lastLogIn) {
		this.id = id;
		this.name = name;
		this.lastLogIn = lastLogIn;
		this.temp = new Temp;
	}
	log() {
		console.log( 'id: '+ this.id + ', name:' + this.name + ', lastLogIn:' + this.lastLogIn);
	}
	printFunc(profilePicPath) {
		document.getElementById("usersDivContent").innerHTML = document.getElementById("usersDivContent").innerHTML + 
		'<div id="userDiv' + this.id + '"><img src="' + profilePicPath + '" alt="pic" style="height:50px; width:50px; image-rendering: -webkit-optimize-contrast;"> | ' + 
		this.name + ' | <button type="button" id="logIn'+ this.id +
		'" onclick="usersList.logUserIn(this.id)">Log in</button>  <button type="button" id="editUser'+ this.id +
		'" onclick="usersList.goToEditUserPage(this.id)">Edit</button> </div>'
	}
	print() {
		let path = require("path")
		let fs = require('fs')
		let profilePicPath = path.join(getCookie('usersPath'), this.name, 'profile', 'profilePic.jpg')
		if (fs.existsSync(profilePicPath)) profilePicPath = this.temp.getPicPath(profilePicPath)
			let fullPicPath = path.join(getCookie('usersPath'), this.name, 'profile', 'profilePic.jpg')
		if (!fs.existsSync(fullPicPath)) {
			profilePicPath = 'assets' 
			if (isDev()) profilePicPath = path.resolve(profilePicPath)
			profilePicPath = path.join(profilePicPath, 'defaultProfilePic.jpg')
		}
		document.write('<div class="item" id="userDiv' + this.id + '">' +
					'<img src="' + profilePicPath + '" alt="pic" class="item_img">' +
					'<p class="item_name">' + this.name + '</p>' +
					'<div class="item_buttons" style="margin-left: 472px;">' +
						'<img class="item_button" id="logIn'+ this.id +'" src="assets/button_login.png" alt="" onclick="usersList.logUserIn(this.id)">' +
						'<img class="item_button" id="editUser'+ this.id +'" src="assets/button_edit.png" alt="" onclick="usersList.goToEditUserPage(this.id)">' +
					'</div>' +
				'</div>' +
				'<br>')
	}
}
class UserList extends IdGenerator {
	constructor() {
		super();
		this.arrayOfUsers = [];
	}
	addRAM(id, name, lastLogIn) {	
		let user = new User(id, name, lastLogIn);
		this.arrayOfUsers.push(user);
	}
	addStorage(id, name, lastLogIn) {
		let path = require('path')
		let userPath = path.join(getCookie('usersPath'), name)
		let directories = new Directories
		directories.makeDir(userPath)
		directories.makeDir(path.join(userPath, 'profile'))
		let content = id + '\n' + lastLogIn // content to write to file
		directories.rewriteTxt(path.join(userPath, 'profile', 'info.txt'), content)
		directories.makeDir(path.join(userPath, 'decks'))
	}
	getUserName(idClicked) {
  		let idClickedNum = +idClicked
		let userObjToDel = this.arrayOfUsers.find(o => o.id == idClickedNum);
		return userObjToDel.name;
	}
	updateStorage(id, lastLogIn) {
		let name = this.getUserName(id)
		let fs = require('fs')
		let path = require('path')
		let directories = new Directories
		let userPath = path.join(getCookie('usersPath'), name)
		let content = id + '\n' + lastLogIn // content to write to file
		directories.rewriteTxt(path.join(userPath, 'profile', 'info.txt'), content)
	}
	addNewUser(userName, profilePicPath) {
		let id = this.newID();
		let loginTime = Date.now();
		this.addRAM(id, userName, loginTime)
		this.addStorage(id, userName, loginTime)

		if (profilePicPath != '') {
			let directories = new Directories
			let path = require("path")
			directories.copyFile(profilePicPath, path.join(getCookie('usersPath'), userName, "profile", "profilePic.jpg"))
		}
		setCookie("user", userName)
		window.location.href = "../views/decks.html";
	}
	deleteStorage(userName) { 
			let path = require('path')
			let directories = new Directories
			directories.deleteDir(path.join(getCookie('usersPath'), userName))
	}
	deleteUser(name) {
  		let userNameToDelete = name.substr(10, name.length)
			if (confirm('Are you sure to delete "' + userNameToDelete + '"?')) {
				this.deleteStorage(userNameToDelete)
				window.location.href = "../views/users.html";
			}
	}
	log() {
		console.log('==== USERS: ====');
		for (let i of this.arrayOfUsers) {
			i.log();
		}
		console.log('================');
	}
	isUserDataCorrupted(path) {
		let result = false;
		let fs = require('fs')
		if (fs.existsSync(path)) {
    		console.log('Found user info file in ' + path);
		} else { result = true; }
		return result;
	}
	load() {
		let directories = new Directories
		let path = require('path')
		let usersPath = getCookie('usersPath')
		let usersDirsArr = directories.getAllDirs(usersPath)
		let id_tmp
		let name_tmp
		let date_tmp
		let lineCounter
		let pathToInfo
		this.arrayOfUsers.length = 0
		this.resetID()
		for (let i of usersDirsArr) {
		  pathToInfo = path.join(i, 'profile', 'info.txt')
		  name_tmp = path.basename(i)
		  if (this.isUserDataCorrupted(pathToInfo) == true) {
		  	console.log('Error: data of user "' + name_tmp + '"" is corrupted and will be ignored');
		  } else {
		  lineCounter = 0
		  id_tmp = directories.readOneLine(pathToInfo, lineCounter)
		  console.log('id_tmp ' + id_tmp);
		  this.setID(id_tmp);
		  lineCounter++;
		  date_tmp = directories.readOneLine(pathToInfo, lineCounter)
		  console.log('date_tmp ' + date_tmp);
		  this.addRAM(id_tmp, name_tmp, date_tmp)
		}
		}
		this.arrayOfUsers.sort((a,b) => (a.lastLogIn < b.lastLogIn) ? 1 : ((b.lastLogIn < a.lastLogIn) ? -1 : 0))
	}
	print() {
		document.getElementById("usersDiv").innerHTML = '<div id="usersDivContent"></div>'
		for (let i of this.arrayOfUsers) {
			i.print();
		}
	}
	logUserIn(btnId) {
		let idClicked = btnId.substr(5, btnId.length)
		let userName = this.getUserName(idClicked)
		this.updateStorage(idClicked, Date.now())
		setCookie("user", userName)
		window.location.href = "../views/decks.html";
	}
	goToEditUserPage(btnId) {
		let idClicked = btnId.substr(8, btnId.length)
		let userName = this.getUserName(idClicked)
		setCookie("user", userName)
		window.location.href = "../views/editUser.html";
	}
	goToNewUserPage() {
		window.location.href = "../views/newUser.html";
	}	
}