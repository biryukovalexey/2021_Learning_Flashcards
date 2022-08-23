"use strict";
class NewUser {
	constructor() {
		this.usersList = new UserList
		this.newPicPath = ''
		this.userName = ''
	}
	previewProfilePic() {
		this.newPicPath = document.getElementById("picSelect").value
		if (this.newPicPath == '') {
			alert('No picture selected!')
		} else {
			document.getElementById("profilePicContent").remove()
			document.getElementById("profilePic").innerHTML = '<img id="profilePicContent" src="' + this.newPicPath + '" alt="pic" style="height:256px; width:256px; image-rendering: -webkit-optimize-contrast;">'
		}
	}
	confirm() {
			let users = new UserList
			let path = require("path")
			let fs = require('fs')
			let directories = new Directories
			this.userName = document.getElementById("newNameInput").value
			let newProfilePath = path.join(getCookie('usersPath'), this.userName)
			if ((fs.existsSync(newProfilePath)) && (this.userName != '')) {
				alert(this.userName + ' is already taken!')
			} else {
				if (this.userName == '') {
					alert('Enter name!')
				} else {
					this.newPicPath = document.getElementById("picSelect").value
						users.addNewUser(this.userName, this.newPicPath)
				}
			}
		}
}
