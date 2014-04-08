function addSubmitListener() {
  var ele = document.getElementById("search_form");
  if (ele.addEventListener) {
    ele.addEventListener("submit", openNewTab, false);
  } else if (ele.attachEvent) {
    ele.attachEvent('onsubmit', openNewTab);
  }
}

function openNewTab() {
  var searchField = document.getElementById("search_field")
  var searchTerm = searchField.value
  chrome.tabs.create({url: "http://www.scholar.google.com/scholar?q=" + searchTerm})
}

document.addEventListener("DOMContentLoaded", function() {
  addSubmitListener();
})