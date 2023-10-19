// packages
const mongoose = require('mongoose')

// schema
const DumperSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        default: "normal"
    },
    lat: {
        type: Number,
    },
    long: {
        type: Number,
    }
})

// hooks


// static-methods
DumperSchema.statics.createDumper = async function (id, status, lat, long){
    const response = {
        created: false,
        message: "",
    }
    const dumperExist = await this.exists({id: id})
    if(dumperExist){
        response.message = "id already exist"
        return response
    }
    try{
        const dumper = await this.create({
            id: id,
            status: status,
            lat: lat,
            long: long 
        })
        response.created = true
        response.message = "ok"
    }
    catch(err){
        response.message = "server error " + err
    }
    return response
}

DumperSchema.statics.updateDumper = async function (dumpersData){
    
    let response = {
        created: 0,
        updated: 0
    }
    const ids = dumpersData.map(dumper => dumper.id)
    const dumpers = await this.find({'id': { $in: ids}})
    for(let ind in dumpersData){
        let doc = dumpers.find( (ele) => {
            return ele.id === dumpersData[ind].id
        })
        if (doc !== undefined){
            doc.status = dumpersData[ind].status
            doc.lat = dumpersData[ind].lat
            doc.long = dumpersData[ind].long
            await doc.save()
            response.updated += 1
        }
        else{
            const createdResponse = await this.createDumper(dumpersData[ind].id, dumpersData[ind].status, dumpersData[ind].lat, dumpersData[ind].long)
            response.created += (createdResponse === true) ? 1 : 0
        }
    }
    return response
    
}

DumperSchema.statics.getDumpers = async function (){
    const response = await this.find({}, '-_id -__v')
    return response
}

module.exports = mongoose.model('Dumper', DumperSchema)