enyo.kind({
	name: "App",
	fit: true,
	components:[
		{name: "hello", content: "Hello World", allowHtml: true, ontap: "helloWorldTap"},
		{name: "honey", content: "Hi Honey!", style: 'color: blue'}
	],
	helloWorldTap: function(inSender, inEvent) {
		this.$.hello.addContent("<br/><b>hello</b> control was tapped");
	}
});

enyo.kind({
	name: "honey",
	kind: enyo.Control,
	tag: 'p',
	content: 'Hi Honey!',
	style: 'color: blue'
});


