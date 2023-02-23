const notFound = (req, res) =>
res.status(404).send(`Rote not found try <a href = '/api/v1/teams'>FOOTBALL API</a>`);

module.exports = notFound