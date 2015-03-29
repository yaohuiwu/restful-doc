/**
 * Created by yaohui on 15-3-22.
 */

var userTable = document.getElementById("userTable");
Ajax.loadList("/restapi/users", function(result){
    if(result.isSuccess){
        renderUserList(userTable, result.data);
    }else{
        alert("load list failed!" + result.data.message);
    }
});

var queryUserListFm = document.getElementById("queryUserList");
EventUtil.addHandler(queryUserListFm, "submit", function(event){
    var event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);

    var queryString = "filterText=" + encodeURIComponent(queryUserListFm["filterText"].value);

    Ajax.loadList("/restapi/users?" + queryString, function(result){
        if(result.isSuccess){
            renderUserList(userTable, result.data);
        }else{
            alert("load list failed!" + result.data.message);
        }
    });
});

function renderUserList(ele, data){

    //remove tbody
    ele.removeChild(ele.lastChild);

    var tbody = document.createElement("tbody");
    for(var i= 0,len = data.length; i<len; i++){
        var tr = createRow(data[i]);
        tbody.appendChild(tr);
    }
    ele.appendChild(tbody);

}

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