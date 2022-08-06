// Pause video
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "pause") {
        document.querySelectorAll("video").forEach(x => x.pause())
    }
});
