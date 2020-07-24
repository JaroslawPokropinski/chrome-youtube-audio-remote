chrome.runtime.onInstalled.addListener(function() {

  console.log('Installed')

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.youtube.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  const dv = 0.01;
  chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    if (command === 'volume_up' || command === 'volume_up2') {
      const cdv = (command === 'volume_up')? dv : dv * 2;
      chrome.tabs.query({url: 'https://www.youtube.com/*'}, function(tabs) {
        tabs.forEach(tab => {
          chrome.tabs.executeScript(
            tab.id,
            { code: `document.querySelector('.video-stream').volume += ${cdv};` });
        });
      });
        
      return;
    }

    if (command === 'volume_down' || command === 'volume_down2') {
      const cdv = (command === 'volume_down')? dv : dv * 2;
      chrome.tabs.query({url: 'https://www.youtube.com/*'}, function(tabs) {
        tabs.forEach(tab => {
          chrome.tabs.executeScript(
            tab.id,
            { code: `if (document.querySelector('.video-stream').volume > ${cdv}) document.querySelector('.video-stream').volume -= ${cdv}; else document.querySelector('.video-stream').volume = 0;` });
        });
      });
        
      return;
    }

    console.log('Unknown command:', command)

  });
});