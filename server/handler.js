'use strict';

module.exports.query = (event, context, cb) => {
	var osmosis = require('osmosis');
	if (event.query && event.query.q) {
		var posts = [];
		try {
			osmosis
				.get('https://twitter.com/search?q=' + event.query.q)
				.find('.stream-item')
				.set({
				    'text': '.tweet-text',
				})
				.data(function (post) {
					if (post) {
						post.key = posts.length + 1;
						posts.push(post);
					}
				})
				.done(function () {
					cb(null, { 
						posts: posts
					});
				})
				.error(function (err) {
					cb(null, { 
						message: 'No results found'
					});
				});
		} catch (e) {
			cb(null, { 
				message: 'No results found'
			});
		}

	} else {
		cb(null, { 
			message: 'Missing parameter'
		});
	}
};
