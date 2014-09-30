var express = require('express');
var router = express.Router();
var gengo = require('gengojs');
var keys = require('../views/docs/v0.2/gengokeys.js');
var nativelang = {
    "Japanese": "日本語"
};
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Gengo.js',
        language: nativelang[gengo.language()] || gengo.language(),
    });
});

router.get('/docs', function(req, res) {
    res.render('docs', {
        title: 'Gengo.js',
        language: nativelang[gengo.language()] || gengo.language(),
    });
});

router.get('/docs/v0.2', function(req, res) {
    console.log(gengo.locale());
    res.render('docs/v0.2/docs', {
        title: 'Gengo.js',
        language: nativelang[gengo.language()] || gengo.language(),
        keys: keys
    });
});

module.exports = router;
