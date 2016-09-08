function hello(event, context, cb) {
	var osmosis = require('osmosis');
	if (event.query && event.query.q) {
		var posts = [];
		osmosis
			.get('https://twitter.com/search?q=' + event.query.q)
			.find('.stream-item')
			.set({
			    'text': '.tweet-text'
			})
			.data(function(post) {
				posts.push(post);
			})
			.done(function() {
				console.log('1111');
				console.log(posts);
			})
			.error(console.log);

	} else {
		cb(null, { 
			message: 'Missing parameter'
		});
	}
};

hello({query:{q:'javascript'}}, null, console.log);
