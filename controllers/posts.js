const Post = require('../models/post');

module.exports = {
	//Posts Index
	async getPosts(req,res,next){
		let posts = await Post.find({});
		res.render('posts/index',{posts});
	},
	//Posts New
	newPost(req,res,next){
		res.render('posts/new');
	},
	//Post Create
	async createPost(req,res,next){
		let post = await Post.create(req.body.post);
		res.redirect(`/posts/${post.id}`);
	},
	//Post Show
	async showPost(req,res,next){
		let post = await Post.findById(req.params.id);
		res.render('posts/show',{ post });
	},
	//Edit Post
	async editPost(req,res,next){
		let post = await Post.findById(req.params.id);
		res.render('posts/edit',{ post });
	},
	//Update Post
	async updatePost(req,res,next){
		let post = await Post.findByIdAndUpdate(req.params.id,req.body.post)
		res.redirect(`/posts/${post.id}`);
	},
	//Destroy Post
	async destroyPost(req,res,next){
		let post = await Post.findByIdAndRemove(req.params.id)
		res.redirect('/posts');
	}
}