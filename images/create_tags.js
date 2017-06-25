function createTags(word){
	var htmlTags = "";
	for (var i=0; i<word.length; i++){
		var letter = word[i];
		if (letter == " ") letter = "_";
		htmlTags += "<img src='letters/letter" + letter + ".jpg' class='tiles'> ";
	}
	return htmlTags;
}