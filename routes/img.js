const express = require(`express`);
const imgRouter = express.Router()
const path = require('path');
const ImagensController = require('./../controller/ImagensController')


imgRouter.get('/logotipo', ImagensController.logotipo);
imgRouter.get('/favicon', ImagensController.favicon);

imgRouter.get('/:codigo', ImagensController.img_produto);

module.exports = imgRouter;