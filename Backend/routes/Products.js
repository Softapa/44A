/** @format */

const router = require('express').Router();

const { info, getinfo } = require('../Controller/InfoControler');
const headers = require('../Middleware/Checkauth');
router.post('/info/:id', info);
// router.post('/', info);

module.exports = router;
//  headers,
