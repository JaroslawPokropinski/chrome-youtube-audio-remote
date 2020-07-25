const bkg = chrome.extension.getBackgroundPage();
let volumeInput = document.getElementById('volume');

function saveVolume(resultsArray){
  volumeInput.value = resultsArray[0] * 1000;
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
      tabs[0].id,
      { code: `document.querySelector('.video-stream').volume;` }, saveVolume);
});

volumeInput.onchange = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        { code: `document.querySelector('.video-stream').volume = ${parseFloat(volumeInput.value) / 1000};` });
      chrome.tabs.executeScript(
        tab.id,
        { code: `document.querySelector('.ytp-volume-slider-handle').style = "left: " + Math.floor(parseFloat(document.querySelector('.video-stream').volume) * 40 / 0.35) + "px;";` });
  });
}