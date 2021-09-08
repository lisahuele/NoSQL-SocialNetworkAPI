const router = require('express').Router();
// const { controller methods } = require();

router
    .route('/')
    .get()
    .post();

router
    .route('/:id')
    .get()
    .put()
    .delete();

router
    .route('/:userId/friends/:friendsId')
    .post()
    .delete();

module.exports = router;