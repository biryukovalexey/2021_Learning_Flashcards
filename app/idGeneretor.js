class IdGenerator {
	constructor() {
		this.lastID = getCookie("lastID")
	}
	newID() {
		this.lastID++
		setCookie("lastID", this.lastID)
		return this.lastID
	}
	resetID() {
		this.lastID = -1
		setCookie("lastID", this.lastID)
	}
	setID(newID) {
		if (newID > this.lastID) { 
			this.lastID = newID
			setCookie("lastID", this.lastID)
		}
	}
}