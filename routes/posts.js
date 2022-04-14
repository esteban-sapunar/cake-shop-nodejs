const express = require('express');
const router = express.Router();

/* GET posts index  /posts. */
router.get('/', (req, res, next) => {
  res.send('/posts');
});

/* GET posts new  /posts. */
router.get('/new', (req, res, next) => {
  res.send('/posts/new');
});

/* GET posts create  /posts. */
router.post('/', (req, res, next) => {
  res.send('CREATE /posts/');
});

/* GET posts show  /posts. */
router.get('/:id', (req, res, next) => {
  res.send('SHOW /posts/:id');
});

/* GET posts edit  /posts. */
router.get('/:id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/edit');
});

/* GET posts update  /posts. */
router.put('/:id', (req, res, next) => {
  res.send('UPDATE /posts/:id');
});

/* GET posts destroy  /posts. */
router.delete('/:id', (req, res, next) => {
  res.send('DELETE /posts/:id');
});


module.exports = router;

/*
GET index		/posts
GET new			/posts/new
POST create		/posts
GET show		/posts/:id
GET edit		/posts/:id/edit
PUT update		/posts/:id
DELETE destroy	/posts/:id
*/