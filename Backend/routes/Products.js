/** @format */

const router = require('express').Router();

const { info, getinfo } = require('../Controller/InfoControler');
const headers = require('../Middleware/Checkauth');
router.post('/info', info);
router.get('/approved', getinfo);

module.exports = router;
//  headers,
