const express = require('express');
const router = express.Router();
const { validateCreate, validateUpdate } = require('../middlewares/validators/productValidators');

const create = require('../controllers/create');
const retrieve = require('../controllers/retrieve');
const update = require('../controllers/update');
const del = require('../controllers/delete');
const search = require('../controllers/search');

router.get('/', search);
router.post('/', validateCreate, create);
router.get('/:product_id', retrieve);
router.put('/:product_id', validateUpdate, update);
router.delete('/:product_id', del);

module.exports = router;
