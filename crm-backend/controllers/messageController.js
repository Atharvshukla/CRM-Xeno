const redisClient = require('../utils/redisClient');

exports.sendMessage = async (req, res) => {
    const { message } = req.body;
    redisClient.publish('notification', JSON.stringify({ message }));
    res.json({ message: 'Message sent to all subscribers.' });
};
