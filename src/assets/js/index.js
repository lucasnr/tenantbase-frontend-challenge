// fails because of cors
fetch('http://www.colourlovers.com/api/palettes/new?format=json')
	.then((response) => response.json())
	.then((data) => console.log(data));
