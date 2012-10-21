
var list = new enyo.Control({
	tag: "div",
	components: [
		{ tag: "p", content: "The Additive Primary Colors" },
		{ tag: "ul", components: [
			{tag: "li", name: "red", content: "red", style: "color: red"},
			{tag: "li", name: "green", content: "green"},
			{tag: "li", name: "blue", content: "blue"}]}]
});

list.$.green.applyStyle("color", "green");
list.$.blue.applyStyle("color", "blue");
	

