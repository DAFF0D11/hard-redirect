let form = document.getElementById("redirectList")

chrome.storage.local.get("hardRedirectorList", (localRedirectList) => {

    localRedirectList.hardRedirectorList.forEach(rule => {
        let input = document.createElement("input")
        input.setAttribute("type", "checkbox")
        input.setAttribute("id", rule.id)
        input.setAttribute("name", rule.from)
        input.setAttribute("value", rule.to)
        let label = document.createElement("label")
        label.setAttribute("for", rule.id)
        label.appendChild(document.createTextNode(rule.label))
        let br = document.createElement("br")
        form.appendChild(input)
        input.onclick = function () { handleChange(input, localRedirectList) }
        form.appendChild(label)
        form.appendChild(br)
        document.getElementById(rule.id).checked = rule.enabled
    })
});

function handleChange(input, localRedirectList) {
    let lrl = localRedirectList.hardRedirectorList
    for (let i = 0; i < lrl.length; i++) {
        if (lrl[i].id == input.id) {
            lrl[i].enabled = !lrl[i].enabled
        }
    }
    chrome.storage.local.set({ hardRedirectorList: lrl })
}
