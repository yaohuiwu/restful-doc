/**
 * Created by yaohui on 15-3-22.
 */

var userTable = document.getElementById("userTable");
Ajax.loadList("/restapi/users", function(result){
    if(result.isSuccess){

        var array = result.data;
        //alert(result.responseText);
        var tBody = document.createElement("tbody");

        for(var i= 0,len = array.length; i<len; i++){
            var tr = createRow(array[i]);
            tBody.appendChild(tr);
        }

        userTable.appendChild(tBody);
    }else{
        alert("load list failed!" + result.data.message);
    }
});

function createRow(user){
    var tr = document.createElement("tr");
    tr.appendChild(createCol(user.name));
    tr.appendChild(createCol(user.account));
    tr.appendChild(createCol(user.mobilePhone));
    return tr;
}

function createCol(val){
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(val))
    return td;
}