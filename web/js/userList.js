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
    loadUserList("/restapi/users?" + queryString, userTable);
    //Ajax.loadList("/restapi/users?" + queryString, function(result){
    //    if(result.isSuccess){
    //        renderUserList(userTable, result.data);
    //    }else{
    //        alert("load list failed!" + result.data.message);
    //    }
    //});
});

function loadUserList(url, table){
    Ajax.loadList("/restapi/users?" + url, function(result){
        if(result.isSuccess){
            renderUserList(userTable, result.data);
        }else{
            alert("load list failed!" + result.data.message);
        }
    });
}

function renderUserList(ele, data){

    //remove tbody
    ele.removeChild(ele.lastChild);

    var tbody = document.createElement("tbody");
    for(var i= 0,len = data.length; i<len; i++){
        var tr = createRow(data[i]);
        var opCol = createOperationCol("/restapi/users/" + data[i]["id"]);
        tr.appendChild(opCol);

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

function createOperationCol(url){
    var td = document.createElement("td");
    //td.appendChild(document.createTextNode(val))
    var delAnchor = document.createElement("a");
    delAnchor.href = url;
    delAnchor.textContent  = "删除";
    td.appendChild(delAnchor);

    EventUtil.addHandler(delAnchor, 'click', function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        EventUtil.preventDefault(event);

        Ajax.delete(target.href, function(restult){
            var queryString = "filterText=" + encodeURIComponent(queryUserListFm["filterText"].value);
            loadUserList("/restapi/users?" + queryString, userTable);
        });
    });
    return td;
}