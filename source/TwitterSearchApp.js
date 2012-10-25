enyo.kind({
	name: "TwitterSearchApp",
	kind: enyo.FittableRows,
	classes: "onyx",
	components: [
		{kind: "onyx.Toolbar", components: [
		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.Input", name: "searchTerm", placeholder: "Search on Twitter", onkeydown: "searchOnEnter"},
			{kind: "Image", src: "search-input-search.png", ontap: "search"}
		]},
		{tag: "p", content: "Popular only"},
		{kind:"onyx.ToggleButton", name:"popularOnly", value: false},
		
	]},
		{kind: "enyo.Scroller", fit:true, components: [
		{tag: "div", name: "tweetList"}
		]}
	],
	searchOnEnter: function(inSender, inEvent) {
			if (inEvent.keyCode === 13) {
				this.search();
				return true;
			}
	},

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
		var popular = "";
		var request = new enyo.JsonpRequest({
			url: "http://search.twitter.com/search.json",
			callbackName: "callback",
			result_type: "popular"
	});
		if (this.$.popularOnly.value === true) {
			popular = "popular";
		}
		else {
			popular = "mixed";
		}
	request.response(enyo.bind(this, "processSearchResults"));
	request.go({ q: searchTerm, result_type: popular } );
	},

	processSearchResults: function(inRequest, inResponse) {
		if (!inResponse) return;
		this.$.tweetList.destroyClientControls();
		enyo.forEach(inResponse.results, this.addTweet, this);
		this.$.tweetList.render();
	}
});	
			
