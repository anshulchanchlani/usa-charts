//sample   {"name":"Call parents", "data": {"2017-01-01": 5, "2017-01-02": 3, ...}}
// {"name":"AL","agriculture":60.0, "manufacturing":0.0, "mining":2.0, "trade":0.0, "domestic service":0.0, "professional service":0.0}


var convertArrayOfJsonObjectsToRequiredFormatForLineChart = function (data,key,callback){
    let convertedData =[];
    if(data!==null && data!==undefined && data!==''){
        data.forEach(function(obj){
            let tempObj ={};
            tempObj["name"] = obj[key];
            delete obj[key];
            tempObj["data"] = obj;
            convertedData.push(tempObj);   

        })
        return convertedData;
    }
    else{
        return null;
    }
}

var filterDataAccordingToState = function(state,data,key,states){
    if(!isNaN(state)&&state===undefined && state===null && state==='' || data===null){
    
        return null;
    }
    else{

        data = data.filter(function(obj){
            return (obj["name"] === state || states[obj["name"]].toUpperCase().indexOf(state.toUpperCase())>-1)
        })
        return data;
    }

}


export {convertArrayOfJsonObjectsToRequiredFormatForLineChart,
filterDataAccordingToState}