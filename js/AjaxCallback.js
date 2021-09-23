let XMLHttpRequest = require ("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes()+ "Mins:" + date.getSeconds()+ "Secs";
}

function makeAJAXCall(methodType,url,callback,async = true, data = null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(methodType+" State Changed Called. Ready State: "+
                    xhr.readyState+" Status:"+xhr.status);
        if(xhr.readyState==4){
            //Matching all 200 Series Response
        if(xhr.status == 200 || xhr.status == 201){
            callback(xhr.responseText);
        } else if (xhr.status>=400){
            console.log("Handle 400 Client Error or 500 Server Error");
        }   
    }            
}

xhr.open(methodType,url,async);
if(data){
    console.log(JSON.stringify(data));
    xhr.setRequestHeader("content-Type","application/json");
    xhr.send(JSON.stringify(data));
} else xhr.send();

console.log(methodType+"request sent to the server at:"+showTime());
}
const getURL = " http://localhost:4000/employees";
function getUserDetails(data){
    console.log("Get User Data at: "+showTime()+"Data: " +data)
}
makeAJAXCall("GET",getURL,getUserDetails,true);
console.log("Made GET AJAX Call To Server at:"+showTime());

const deleteURL = " http://localhost:4000/employees/4"
function userDeleted(data){
    console.log("User Deleted at: "+showTime()+"Data:" +data)
}
makeAJAXCall("DELETE",deleteURL,userDeleted,false);
console.log("DELETE at:"+showTime());

const PostURL = " http://localhost:4000/employees";
const emplData = {"name":"pankaj","salary":"50000"};
function userAdded(data){
    console.log("User Added at :"+showTime+"Data:"+data)
} 
makeAJAXCall("POST",PostURL,userAdded,true,emplData);
console.log("CREATED at:"+showTime());
