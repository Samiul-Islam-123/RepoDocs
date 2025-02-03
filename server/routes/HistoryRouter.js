const { getHistory, getHistoryDetails } = require('../controller/HistoryController');
const authenticateToken = require('../middlewares/authmiddleware');

const HistoryRouter = require('express').Router();

HistoryRouter.get('/', authenticateToken ,getHistory);
HistoryRouter.get('/details', authenticateToken, getHistoryDetails)

module.exports = HistoryRouter;