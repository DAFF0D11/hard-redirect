const redirectList = [
    ["https:www.google.com/(.*)","https:www.startpage.com/\\1"]
]


let localRedirectList

chrome.runtime.onInstalled.addListener(() => {
    // Set local list
    chrome.storage.local.set({ hardRedirectorList: redirectList })
    // Get local list
    chrome.storage.local.get("hardRedirectorList", (data) => {
        // clear and upade with local list
        chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: Array(100).fill().map((_, i) => i + 1) })
        chrome.declarativeNetRequest.updateSessionRules(makeRules(onlyEnabled(data.hardRedirectorList)))
    });

});

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get("hardRedirectorList", (data) => {
        chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: Array(100).fill().map((_, i) => i + 1) })
        chrome.declarativeNetRequest.updateSessionRules(makeRules(onlyEnabled(data.hardRedirectorList)))
    });
})
let onlyEnabled = (list) => {
    return list.filter((ele) => { return ele.enabled == true})
}
let makeRules = (list) => {
    let delIds = []
    let rules = []
    for (let i = 0; i < list.length; i++) {
        rules.push({
            id: list[i].id,
            action: {
                type: "redirect",
                redirect: { regexSubstitution: list[i].to }
            },
            condition: {
                resourceTypes: ["main_frame"],
                regexFilter: list[i].from
            }
        })
        delIds.push(i + 1)
    }

    return { removeRuleIds: delIds, addRules: rules }
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    console.log("onChanged")
    chrome.storage.local.get("hardRedirectorList", (data) => {
        chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: Array(100).fill().map((_, i) => i + 1) })
        chrome.declarativeNetRequest.updateSessionRules(makeRules(onlyEnabled(data.hardRedirectorList)))
    });
});
