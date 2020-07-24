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
  });
}

// chrome.commands.onCommand.addListener(function(command) {
//   if (command === 'volume up') {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.executeScript(
//           tabs[0].id,
//           { code: `document.querySelector('.video-stream').volume += ${0.05};` });
//     });
//     return;
//   }

//   if (command === 'volume down') {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.executeScript(
//           tabs[0].id,
//           { code: `document.querySelector('.video-stream').volume -= ${0.05};` });
//     });
//     return;
//   }

//   console.log('Unknown command:', command)

// });