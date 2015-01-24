var osmPrefix = "http://www.openstreetmap.org/search?query=";

var gMapsLinks = document.querySelectorAll('a[href*="maps.google.com/maps?"]');
var gMapsSearchPrefix = "q=";
replaceMapLinksWithOSM(gMapsLinks, gMapsSearchPrefix);

var bingMapsLinks = document.querySelectorAll('a[href*="bing.com/maps/default.aspx?"]');
var bingSearchPrefix = "where1=";

var yahooMapsLinks = document.querySelectorAll('a[href*="maps.yahoo.com"]');
var yahooSearchPrefix = "addr=";
replaceMapLinksWithOSM(yahooMapsLinks, yahooSearchPrefix);

self.port.on('checkURL', function(currentURL) {
  replaceMapLinksWithOSM(bingMapsLinks, bingSearchPrefix);
  if (currentURL.indexOf("www.facebook.com") > -1) {
	//.replace(/\\\//g, "/");
	var fbBingLinks = document.querySelectorAll('a[onmouseover*="www.bing.com\\\\/maps\\\\/default.aspx?"]');
        fbBingLinks = decodingURIArray(removeMouseListeners(fbBingLinks, bingSearchPrefix));
	replaceMapLinksWithOSM(fbBingLinks, bingSearchPrefix);
  }
});


function replaceMapLinksWithOSM(mapLinks, searchPrefix){
	for(var i = 0; i < mapLinks.length; i++) { 
		var link = mapLinks[i].href;
		//console.log("Link: " + link);

		var search = link.split(searchPrefix)[1]; //Get url parameters beginning from the search query
		if(!search)
		   continue; //In case query parameter is not available
		search = search.split('&')[0]; //Get search query only (Remove other params)
		//console.log("search: " + search);

		//Remove double keywords in the string
		var keywords = search.split('+');
		for(var j = 0; j < keywords.length; j++) { 
			var current = keywords[j];
			for(var k = 0; k < keywords.length; k++) { 
				if(j != k){
					if(current == keywords[k])
						keywords.splice(k, 1);
				}
			}
		}
		search = keywords.join('+');

		//create OSM link with the parsed search query
		var osmLink = osmPrefix + search;
		mapLinks[i].href = osmLink;
		//console.log("osmlink: " + osmLink);
	}
}

function removeMouseListeners(array) {
      for(var i=0; i < array.length; i++) {
            array[i].removeAttribute("onmouseover");
            array[i].removeAttribute("onclick");
      }
      return array;
}

function decodingURIArray(array) {
	for(var i=0; i < array.length; i++) {
		var uri = array[i].href;
		//console.log("encoded " + uri); 
		var decodeURI1 = decodeURI(uri);
		var decodeURI2 = decodeURIComponent(decodeURI1);
		array[i].href = decodeURI2;
		//console.log("decoded " + array[i].href); 
	}
	return array;
}


