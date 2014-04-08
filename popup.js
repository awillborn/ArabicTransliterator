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
  searchTerms.push(userInput.replace(/u/, "o"))
  searchTerms = searchTerms.join(" OR ")
  openNewTab(searchTerms)
}

function openNewTab(searchTerm) {
  chrome.tabs.create({url: "http://www.scholar.google.com/scholar?q=" + searchTerm})
}

document.addEventListener("DOMContentLoaded", function() {
  addSubmitListener();
})