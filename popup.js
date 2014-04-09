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
    "u": /o/,
    "ay": /ai/,
    "ay": /ei/,
    "ai": /ay/,
    "ai": /ei/,
    "ei": /ay/,
    "ei": /ai/,
    "au": /aw/,
    "aw": /au/,
    "a": /aa/,
    "i": /ee/,
    "y": /yy/,
    "b": /bb/,
    "j": /jj/,
    "m": /mm/,
    "d": /dd/,
    "r": /rr/,
    "s": /ss/,
    "al": /el/,
    "el": /al/
    }
  for (var key in regEx) {
    for (i = 0; i < searchTerms.length; i++){
      if (searchTerms[i].search(regEx[key]) != -1) {
        searchTerms.push(searchTerms[i].replace(regEx[key], key))
      }
    }
  }
  searchTerms = searchTerms.join(" OR ")
  openNewTab(searchTerms)
}

function openNewTab(searchTerm) {
  chrome.tabs.create({url: "http://www.scholar.google.com/scholar?q=" + searchTerm})
}

document.addEventListener("DOMContentLoaded", function() {
  addSubmitListener();
})