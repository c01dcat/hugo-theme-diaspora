var fuse; // holds our search engine
var searchVisible = false; 
var firstRun = true; // allow us to delay loading json data unless search activated
var list = document.getElementById('searchResults'); // targets the <ul>
var maininput = document.getElementById('local-search-input'); // input box for search
var resultsAvailable = false; // Did we get any search results?

// ==========================================
// execute search as each character is typed
//
document.getElementById("local-search-input").onkeyup = function(e) { 
  executeSearch(this.value);
}


// ==========================================
// fetch some json without jquery
//
function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}


// ==========================================
// load our search index, only executed once
// on first call of search box (CMD-/)
//
function loadSearch() { 
  fetchJSONFile('/search/index.json', function(data){

    var options = { // fuse.js options; check fuse.js website for details
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      includeScore: true,
      includeMatches: true,
      keys: [
        { name: "title", weight: 0.8 },
        { name: "content", weight: 0.5 },
        { name: "tags", weight: 0.3 },
      ]
    };
    fuse = new Fuse(data, options); // build the index from the json file
  });
}


// ==========================================
// using the index we loaded on CMD-/, run 
// a search query (for "term") every time a letter is typed
// in the search box
//
function executeSearch(term) {
  loadSearch();
  let results = fuse.search(term); // the actual query being run using fuse.js
  let searchitems = ''; // our results bucket

  if (results.length === 0) { // no results based on what was typed into the input box
    resultsAvailable = false;
    searchitems = '';
  } else { // build our html 
    for (let item in results.slice(0,5)) { // only show first 5 results
        searchitems = searchitems + '<li><a href="' + results[item].item.permalink + '" class="search-result-title" target="_blank" tabindex="0">' + results[item].item.title + '</a> <p class="search-result">' + results[item].item.summary + '</p></li>';
    }
    resultsAvailable = true;
  }

  document.getElementById("searchResults").innerHTML = searchitems;
}
