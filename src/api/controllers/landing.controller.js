exports.index1 = (req, res) => {
	res.status(200).json({
		message: 'Working'
	});
}
exports.index2 = (req, res) => {
	res.status(200).json({
		message: 'Not Working'
	});
}