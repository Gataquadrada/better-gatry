chrome.action.onClicked.addListener((tab) => {
	if (tab.url.includes("gatry.com")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["main.js"],
		})
	}
})
