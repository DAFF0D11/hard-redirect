// Snag our button
let btn = document.getElementById("changeFont")
let form = document.getElementById("redirectList")

chrome.storage.local.get("hardRedirectorList", (redirList) => {

    redirList.hardRedirectorList.forEach(ele => {
        let input = document.createElement("input")
        input.setAttribute("type","checkbox")
        input.setAttribute("id",ele.id)
        input.setAttribute("name",ele.from)
        input.setAttribute("value",ele.to)
        let label = document.createElement("label")
        label.setAttribute("for",ele.id)
        label.appendChild(document.createTextNode(ele.label))
        let br = document.createElement("br")
        form.appendChild(input)
        input.onclick = function() {handleChange(input, redirList)}
        form.appendChild(label)
        form.appendChild(br)
        document.getElementById(ele.id).checked = ele.enabled

    })
});

function handleChange(checkbox,redirList) {
 let list = redirList.hardRedirectorList
    for(let i = 0; i < list.length; i++){
        if(list[i].id == checkbox.id) {
            list[i].enabled = !list[i].enabled
        }
    }
    chrome.storage.local.set({ hardRedirectorList: list })
}
