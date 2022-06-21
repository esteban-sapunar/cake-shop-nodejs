const Post = require('../models/post');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN});
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'donsapu',
	api_key: '976551569547713',
	api_secret : process.env.CLOUDINARY_SECRET
})

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
		req.body.post.images = [];
		for(const file of req.files){
			let image = await cloudinary.v2.uploader.upload(file.path);
			req.body.post.images.push({
				url: image.secure_url,
				public_id: image.public_id
			});
		}
		let response = await geocoder.forwardGeocode({
	      query: req.body.post.location,
	      limit: 1
	    })
	    .send();
	    req.body.post.coordinates = response.body.features[0].geometry.coordinates;
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
		let post = await Post.findById(req.params.id);
		//check if there are images for deletion
		if(req.body.deleteImages && req.body.deleteImages.length){
			let deleteImages = req.body.deleteImages;
			for(const public_id of deleteImages){
				await cloudinary.v2.uploader.destroy(public_id);
				for(const image of post.images){
					if(image.public_id === public_id){
						let index = post.images.indexOf(image);
						post.images.splice(index,1);
					}
				}
			}

		}
		if (req.files){
			for(const file of req.files){
				let image = await cloudinary.v2.uploader.upload(file.path);
				post.images.push({
					url: image.secure_url,
					public_id: image.public_id
				});
			}
		}

		post.title = req.body.post.title;
		post.description = req.body.post.description;
		post.price = req.body.post.price;
		if(post.location != req.body.post.location){
			post.location = req.body.post.location;
			let response = await geocoder.forwardGeocode({
			      query: req.body.post.location,
			      limit: 1
			})
			.send();
			post.coordinates = response.body.features[0].geometry.coordinates;
		}

		post.save();

		res.redirect(`/posts/${post.id}`);
	},
	//Destroy Post
	async destroyPost(req,res,next){
		let post = await Post.findById(req.params.id);
		for(const image of post.images){
			await cloudinary.v2.uploader.destroy(image.public_id);
		}
		await post.remove();
		res.redirect('/posts');
	}
}