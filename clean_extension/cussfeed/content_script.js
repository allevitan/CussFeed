walk(document.body);
document.title = 'CussFeed';

//Basically stolen from cloud-to-butt
function walk(node) 
{
        // I stole this function from here:
        // http://is.gd/mwZp7E
        
        var child, next;

        switch ( node.nodeType )  
        {
                case 1:  // Element
                case 9:  // Document
                case 11: // Document fragment
                        child = node.firstChild;
                        while ( child ) 
                        {
                                next = child.nextSibling;
                                walk(child);
                                child = next;
                        }
                        break;

                case 3: // Text node
                        handleText(node);
                        break;
        }
}

function cuss_form(tag, word)
{
    try {
	return cusses[tag][0];
    } catch(err) {
	//simple and powerful correction
	if (word.toLowerCase() == 'an'){return 'a'}
	return word;
    }
}

function handleText(node)
{
    var v = node.nodeValue;
    var words = new Lexer().lex(v)
    var taggedWords = new POSTagger().tag(words);
    var lastidx = 0;
    var nextidx = 0;
    for (i in taggedWords) {
	var word = taggedWords[i][0];
	var tag = taggedWords[i][1];
	if (word == "ll" || word == "d" || word == "s" || 
	    word == "m" || word == "ve" || word == "n't" ||
	    word == "o" || word == "re" || word == "y"){
	    lastidx = lastidx + word.length;
	    continue; //don't replace
	}
	var regword = word.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");//sanitize
	var regexp = new RegExp(regword);
	try {
	    nextidx = lastidx + v.slice(lastidx).match(regexp).index;
	    var replacement = match_caps(cuss_form(tag, word),word);
	    v = v.slice(0,lastidx) +  v.slice(lastidx).replace(regexp, replacement);
	    lastidx = nextidx + replacement.length;
	} catch(err) {continue;}
    }
    
    node.nodeValue = v;
}

function match_caps(cuss, word)
{
    if (word.charAt(word.length-1) == ':' ||
	word.charAt(word.length-1) == ';')
    {
	cuss = cuss + word.charAt(word.length - 1);
    }
    if (word.charAt(0) == word.charAt(0).toUpperCase())
    {
	if (word == word.toUpperCase())
	{
	    return cuss.toUpperCase();
	} else {
	    return cuss.charAt(0).toUpperCase() + cuss.slice(1);
	}
    } else {
	return cuss;
    }
}


