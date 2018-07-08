const NAME = "name";
const STATE = "State";
const convertArrayOfJsonObjectsToRequiredFormat = function (data,key,states,callback){
    let convertedData =[];

    if(isValidArray(data) && isValidText(key) && (key===NAME ||key===STATE)){
        data.forEach(function(obj){

            let tempObj ={};
            tempObj["name"] = states[obj[key]];
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

const filterDataAccordingToState = function(state,data,key){
    if(!isValidText(state) || !isValidArray(data)){
        return null;
    }else  if(key!==NAME){
        return null;
    }
    else{

        data = data.filter(function(obj){
            
            return (obj[key].toUpperCase().indexOf(state.toUpperCase())>-1)
        })
        
        return data;
    }

}

const isValidArray = function(arr){
    if(arr!==null && arr!==undefined && arr.constructor === Array && arr.length>0){
        return true;
    }
    else 
        return false;
}
const isValidText = function (text){
    if(text!==null && text!==undefined && text!=='' && isNaN(text)){
        return true;
    }else{
        return false;
    }
}

export {convertArrayOfJsonObjectsToRequiredFormat,
filterDataAccordingToState,isValidText,isValidArray,NAME,STATE}