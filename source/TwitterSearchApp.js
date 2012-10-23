enyo.kind({
	name: "TwitterSearchApp",
	kind: enyo.Control,
	components: [
		{tag: "input", name: "searchTerm"},
		{tag: "button", content: "Search", ontap: "search"},
		{tag: "div", name: "tweetList"}
	],

	addTweet: function(inResult) {
		this.createComponent({
			kind: Tweet,
			container: this.$.tweetList,
			icon: inResult.profile_image_url,
			handle: inResult.from_user,
			text: inResult.text
	});
	},

	search: function(){
		var searchTerm = this.$.searchTerm.hasNode().value;
		var request = new enyo.JsonpRequest({
			url: "http://search.twitter.com/search.json",
			callbackName: "callback"
	});

	request.response(enyo.bind(this, "processSearchResults"));
	request.go({ q: searchTerm });
	},

	processSearchResults: function(inRequest, inResponse) {
		if (!inResponse) return;
		this.$.tweetList.destroyClientControls();
		enyo.forEach(inResponse.results, this.addTweet, this);
		this.$.tweetList.render();
	}
});	
			
