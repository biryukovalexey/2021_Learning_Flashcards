"use strict";
class Temp {
	constructor(id, name, lastLogIn) {
		this.fs = require("fs")
		this.path = require("path")
		this.tempPath = 'tmp'
		if (isDev()) this.tempPath = this.path.resolve(this.path.join('views', this.tempPath))
		this.directories = new Directories
	this.clearTemp()
	}
	ifdirex(dir) {
			try {
		  fs.accessSync(dir, fs.constants.R_OK);
		  return true;
		} catch (err) {
		  return false;
		}
	}
	getPicPath(picDocPath) {
		if (isDev()) return picDocPath
		let picName = '' + Date.now() + this.path.extname(picDocPath)
		let picTempPath = this.path.join(this.tempPath, picName)
		let fullPicTempPath = this.path.resolve(this.path.join('views', picTempPath))
		this.directories.copyFile(picDocPath, fullPicTempPath)
		while(true) {
			    if (this.fs.existsSync(fullPicTempPath)) {
					break
				}
		}
		sleep(1000)
		return this.path.join(this.tempPath, picName)
	}
	clearTemp() {
		let pathtest = this.path.resolve(this.path.join('views', this.tempPath))
		this.fs.readdir(pathtest, (err, files) => {
		  if (err) throw err;
		  for (const file of files) {
		    this.fs.unlink(this.path.join(pathtest, file), err => {
		      if (err) throw err;
		    });
		  }
		});
	}
}