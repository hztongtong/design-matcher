chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {action: 'toggleControls'}, (response) => {
    // エラーを防ぐためにレスポンスを処理
    if (chrome.runtime.lastError) {
      console.log('Error:', chrome.runtime.lastError);
      return;
    }
  });
});