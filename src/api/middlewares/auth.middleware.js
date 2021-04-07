const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authToken = req.header('auth-token');
	if (!authToken) {
		return res.status(401).json({
			message: 'Access denied'
		});
	} else {
		jwt.verify(authToken, process.env.JWT_TOKEN_SECRET, (error, verified) => {
			if (error) {
				res.status(400).json({
					error: 'Token invalid!'
				});
			}

			if (verified) {
				res.user = verified;
				next();
			}
		});
	}
}