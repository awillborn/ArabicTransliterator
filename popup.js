function addSubmitListener() {
  var ele = document.getElementById("search_form");
  if (ele.addEventListener) {
    ele.addEventListener("submit", getTransliterations, false);
  } else if (ele.attachEvent) {
    ele.attachEvent('onsubmit', getTransliterations);
  }
}

function getTransliterations() {
  var searchField = document.getElementById("search_field")
  var userInput = searchField.value
  var searchTerms = [userInput]
  var regEx = {
    "o": /u/,
    "u": /ou/,
    "ei": /ay|ai/,
    "ay": /ei|ai/,
    "ai": /ay|ei/,
    "au": /aw/,
    "aw": /au/,
    "a": /aa|ah$/,
    "ah": /a$/,
    "i": /ee/,
    "y": /yy/,
    "b": /bb/,
    "j": /jj/,
    "m": /mm/,
    "d": /dd/,
    "r": /rr/,
    "s": /ss/,
    "al": /el/,
    "el": /al/,
    "al-": /ar-|as-|at-|ad-|az-|an-|ath-|el-/,
    "e$2": /(a)(\w$)/,
    }
  for (var key in regEx) {
    for (i = 0; i < searchTerms.length; i++){
      if (searchTerms[i].search(regEx[key]) != -1) {
        searchTerms.push(searchTerms[i].replace(regEx[key], key))
      }
    }
  }
  searchTerms = findUniques(searchTerms).join(" OR ")
  openNewTab(searchTerms)
}

function openNewTab(searchTerm) {
  chrome.tabs.create({url: "http://www.scholar.google.com/scholar?q=" + searchTerm})
}

function findUniques(searchTerm) {
  var terms = {}, uniqs = [];
  for (var i = 0; i < searchTerm.length; i++) {
    terms[searchTerm[i]] = searchTerm[i];
  }
  for(i in terms) {
    uniqs.push(terms[i]);
  }
  return uniqs;
};

document.addEventListener("DOMContentLoaded", function() {
  addSubmitListener();
})