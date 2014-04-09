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
    "u": /o/
  }
  for (var key in regEx) {
    searchTerms.push(userInput.replace(regEx[key], key))
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