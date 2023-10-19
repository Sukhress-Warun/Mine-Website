async function populateTable(){
    let tableBody = document.getElementById('tablebody')
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.lastChild)
    }
    const response = await fetch("http://" + window.location.host + "/api/data/dumper")
    const dumpersJson = await response.json()
    const dumpers = dumpersJson.dumpers
    for(let i=0;i<dumpers.length;i++){
        let row = document.createElement("tr")
      
        let c1 = document.createElement("td")
        let c2 = document.createElement("td")
        let c3 = document.createElement("td")
        let c4 = document.createElement("td")
        let c5 = document.createElement("td")
        
        c1.innerText = ""+(i+1)
        c2.innerText = "DUMPER-"+String(dumpers[i].id)
        c3.innerText = dumpers[i].status
        c4.innerText = dumpers[i].lat
        c5.innerText = dumpers[i].long 

        if(c3.innerHTML === "normal"){
            c3.classList.add("normal")
        }
        else{
            c3.classList.add("warning")
        }
        
        row.appendChild(c1)
        row.appendChild(c2)
        row.appendChild(c3)
        row.appendChild(c4)
        row.appendChild(c5)
        
        tableBody.appendChild(row)
    }
}

populateTable()
setInterval(populateTable, 2000)