var generateMessage = (from, text, created)=>{
	return {
		from,
		text,
		createdAt:new Date().getTime()
	}
}

module.exports = {generateMessage};