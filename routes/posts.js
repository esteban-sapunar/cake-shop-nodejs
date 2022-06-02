const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({'dest': 'uploads/'})
const {errorHandler} = require('../middleware/index');
const {
	getPosts,
	newPost,
	createPost,
	showPost,
	editPost,
	updatePost,
	destroyPost
} = require('../controllers/posts');

/* GET posts index  /posts. */
router.get('/', errorHandler(getPosts));

/* GET posts new  /posts. */
router.get('/new', newPost);

/* GET posts create  /posts. */
router.post('/', upload.array('images',4), errorHandler(createPost));

/* GET posts show  /posts. */
router.get('/:id', errorHandler(showPost));

/* GET posts edit  /posts. */
router.get('/:id/edit', errorHandler(editPost));

/* GET posts update  /posts. */
router.put('/:id', upload.array('images',4), errorHandler(updatePost));

/* GET posts destroy  /posts. */
router.delete('/:id', errorHandler(destroyPost));


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