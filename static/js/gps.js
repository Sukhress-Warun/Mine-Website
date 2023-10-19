function initData(){
    fetch("http://" + window.location.host + "/api/data/dumper")
	.then(response => response.json())
	.then(data => {
        const dumpers = data.dumpers
        pins = dumpers.map((dump) => {
            let loc = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(dump.lat, dump.long), {
                        title: "DUMPER-"+String(dump.id),
                        icon: createRedArrow(Math.floor(Math.random()*360) - 180)
                    }) 
            let id = dump.id
            return {
                "id": id,
                "pin": loc
            }
        })
        for(let i=0;i<pins.length;i++){
            map.entities.push(pins[i].pin)
        }
    })
	.catch(err => console.error(err));
}

async function updateData(){
    console.log("started")
    const response = await fetch("http://" + window.location.host + "/api/data/dumper")
    const dumpersJson = await response.json()
    const dumpers = dumpersJson.dumpers
    let pinsId = pins.map((pin) => pin.id)
    let newPins = []
    for(let i=0;i<dumpers.length;i++){
        let ind = pinsId.indexOf(dumpers[i].id)
        if(ind !== -1){
            pins[ind].pin.setLocation(new Microsoft.Maps.Location(dumpers[i].lat, dumpers[i].long))
            console.log("updated")
        }
        else{
            let loc = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(dumpers[i].lat, dumpers[i].long), {
                title: "dumper-"+String(dumpers[i].id),
                icon: createRedArrow(Math.floor(Math.random()*360) - 180)
            }) 
            newPins.push({
                "id": id = dumpers[i].id,
                "pin": loc
            })
            console.log("added")

        }
    }
    for(let i=0;i<newPins.length;i++){
        map.entities.push(newPins[i].pin)
        pins.push(newPins[i])
    }
}

function createRedArrow(heading) {
    var c = document.createElement('canvas') 
    c.width = 24 
    c.height = 24 

    var ctx = c.getContext('2d') 

    ctx.translate(c.width * 0.5, c.height * 0.5) 

    ctx.rotate(heading * Math.PI / 180) 

    ctx.translate(-c.width * 0.5, -c.height * 0.5) 

    ctx.fillStyle = '#f00' 

    ctx.beginPath() 
    ctx.moveTo(12, 0) 
    ctx.lineTo(5, 20) 
    ctx.lineTo(12, 15) 
    ctx.lineTo(19, 20) 
    ctx.lineTo(12, 0) 
    ctx.closePath() 
    ctx.fill() 
    ctx.stroke() 

    return c.toDataURL() 
}

function initMap() {
    
    // let noOfPins = 20
    // let pins = []
    // center = {
    //     lat: 0,
    //     lon: 0
    // }
    // for(let i=0;i<noOfPins;i++){
    //     let lat = around.lat + Math.random()/1000
    //     let lon = around.lon + Math.random()/1000
    //     let name = 'DUMPER'+String(i+1).padStart(2, '0')
    //     let angle = Math.floor(Math.random()*360) - 180
    //     const pin = {
    //         lat:lat,
    //         lon:lon,
    //         title:name,
    //         icon:createRedArrow(angle)
    //     }
    //     pins.push(pin)
    //     center.lat += lat
    //     center.lon += lon
    // }
    // center.lat /= noOfPins
    // center.lon /= noOfPins
    const center = {
        //40.982060, -116.374741
        lat: 40.9820,
        lon: -116.3747
    }
    let zoomLevel = 18
    map = new Microsoft.Maps.Map(document.getElementById('map'), {
        credentials: 'AuPS9IrhN8NExVZLzucmvH1ro6vgZjnn5rIGc0BIkkp2ccdsYXmKoE_3u15Z0VH8',
        center: new Microsoft.Maps.Location(center.lat, center.lon),
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: zoomLevel 
    }) 
    
}

let map = null
let pins = []
initData()
setInterval(updateData,2000)
console.log("here")
initMap() 