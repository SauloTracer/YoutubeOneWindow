function totalDurationInSeconds(duration) {
    const units = duration.split(":").reverse();
    let total = 0
    for (let i = 0; i < units.length; i++) {
        total += parseInt(units[i]) * (60 ** i);
    }
    return total;
}

async function newWindow() {
    return await chrome.windows.create({focused: true, type: "normal"});
}

async function join() {
    try{
        const window = await newWindow(); // await chrome.windows.getCurrent();
        const queryOptions = {
            url: [
                "http://www.youtube.com/*",
                "https://www.youtube.com/*",
            ],
        };
        const tabs = await chrome.tabs.query(queryOptions);
        
        await Promise.allSettled(
            tabs.map(async x => {
                await chrome.tabs.move(x.id, {index: -1, windowId: window.id});
                await chrome.tabs.sendMessage(x.id, { action: "pause" });
            })
        )
    } catch(e) {
        console.log(e)
    }
}

chrome.action.onClicked.addListener(join);