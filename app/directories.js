function removeDir(path) {
		let fs = require("fs")
	  if (fs.existsSync(path)) {
	    const files = fs.readdirSync(path)
	    if (files.length > 0) {
	      files.forEach(function(filename) {
	        if (fs.statSync(path + "/" + filename).isDirectory()) {
	          this.removeDir(path + "/" + filename)
	        } else {
	          fs.unlinkSync(path + "/" + filename)
	        }
	      })
	      fs.rmdirSync(path)
	    } else {
	      fs.rmdirSync(path)
	    }
	  } else {
	    console.log("Directory path not found.")
	  }
	}
class Directories {
	constructor() {
		this.directories_fs = require('fs')
		this.path = require('path')
	}
	readOneLine(path, lineIdROL) {
			let lines = require('fs').readFileSync(path, 'utf-8')
	    .split('\n')
	    .filter(Boolean);
	    return lines[lineIdROL];
	}
	makeDir(path) {
		this.directories_fs.mkdir(path, function(err) {
			if (err) {
				console.log(err)
			} else {
			    console.log("Directory created.")
			}
		 })
	}
	renameDir(oldPath, newPath) {
		try {
		this.directories_fs.renameSync(oldPath, newPath)
		} catch (err) {
			console.error(err)
		}
	}
	rewriteTxt(path, content) {
		try {
		  const fd = this.directories_fs.openSync('path', 'w+')
		} catch (err) {
		  console.error(err)
		}
		this.directories_fs.writeFile(path, content, (err) => {
		  if (err) {
		    console.log(err)
		    return
		  }
		 })
	}
	getLastFolder(pathLastFolder) {
		let lastFolder = this.path.basename(pathLastFolder)

		lastFolder = lastFolder.split('/').pop();
		return lastFolder
	}
	deleteDir(path) {
			removeDir(path)
	}
	deleteFile(filePath) {
		this.fs.unlinkSync(filePath)
	}
	getAllDirs(path) {
		const { lstatSync, readdirSync } = require('fs')
	  	const { join } = require('path')
		const isDirectory = source => lstatSync(source).isDirectory()
		const getDirectories = source =>
		  readdirSync(source).map(name => join(source, name)).filter(isDirectory)
		return getDirectories(path)
	}
	copyFile(source, path) {
		let fs = require("fs");
		fs.copyFile(source, path, (err) => {
			if (err) throw err;
		});
	}
}