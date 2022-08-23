"use strict";
class EditUser {
	constructor() {
		this.usersList = new UserList
		this.hasProfilePic = true
		this.isProfilePicChanged = false
		this.newPicPath = ''
		this.userName = getCookie("user")
		this.temp = new Temp
	}
	getUserNameCookie() {
		return this.userName
	}
	printProfilePic() {
		let path = require("path")
		let fs = require('fs')
		let profilePicPath = path.join(getCookie('usersPath'), this.userName, 'profile', 'profilePic.jpg')
		if (!fs.existsSync(profilePicPath)) {
			this.hasProfilePic = false
			profilePicPath = path.resolve('assets')
			profilePicPath = path.join(profilePicPath, 'defaultProfilePic.jpg')
		}
		document.getElementById("profilePic").innerHTML = '<img id="profilePicContent" src="' + profilePicPath + 
		'" alt="pic" style="height:256px; width:256px;border-radius: 300px; image-rendering: -webkit-optimize-contrast;">'
	}
	previewProfilePic() {
		let newPicPath = document.getElementById("picSelect").value
		if (newPicPath == '') {
			alert('No picture selected!')
		} else {
			document.getElementById("profilePicContent").remove()
			document.getElementById("profilePic").innerHTML = '<img id="profilePicContent" src="' + this.temp.getPicPath(newPicPath) + 
			'" alt="pic" style="height:220px;  width:220px;  image-rendering: -webkit-optimize-contrast;">'
		}
	}
	confirmChanges() {
			let path = require("path")
			let fs = require('fs')
			let directories = new Directories
			let newPicPath = document.getElementById("picSelect").value
			if (newPicPath != '') {
				if (this.hasProfilePic) {
					fs.unlinkSync(path.join(getCookie('usersPath'), getCookie('user'), 'profile', 'profilePic.jpg'))
				}
				directories.copyFile(newPicPath, path.join(getCookie('usersPath'), getCookie('user'), 'profile', 'profilePic.jpg'))
			}
			else if (confirm('No profile picture selected. Use default profile picture?')) fs.unlinkSync(path.join(getCookie('usersPath'), getCookie('user'), 'profile', 'profilePic.jpg'))	
			if (document.getElementById("newNameInput").value != '') {
				let newProfilePath = path.join(getCookie('usersPath'), document.getElementById("newNameInput").value)

				if (fs.existsSync(newProfilePath)) {
					alert(document.getElementById("newNameInput").value + ' is already taken!')
				}
				else {
					directories.renameDir(path.join(getCookie('usersPath'), getCookie('user')), newProfilePath)
				}
			}
			window.location.href = "../views/users.html";
		}
}
