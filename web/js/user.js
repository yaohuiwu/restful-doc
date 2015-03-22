/**
 * Created by yaohui on 15-3-22.
 */

var uRegisterForm = document.getElementById("uRegisterForm");

EventUtil.addHandler(uRegisterForm, "submit", function(event){
    var event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);

    var user = new User(uRegisterForm);
    if(!user.isValid()){
        alert("参数不能为空");
        return;
    }

    Ajax.postJson(user, "/restapi/users", function(result){
        if(result.isSuccess){
            alert("添加成功! id=" + result.data.id);
        }else{
            alert("添加失败!" + result.data.message);
        }
    });

    //var xhr = Ajax.createXHR();
    ////set listener before open.
    //xhr.onreadystatechange = function(event){
    //    alert(xhr.readyState);
    //    if(xhr.readyState == 4){
    //        var result = JSON.parse(xhr.responseText);
    //        if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
    //            alert("添加成功! id="+result.id);
    //        }else{
    //            alert("请求失败! " + xhr.status + " " + result.message);
    //        }
    //    }
    //};
    //
    //xhr.open("post", "/restapi/users", false);
    //xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    //xhr.send(JSON.stringify(user));
    return;
});

function User(formElement){
    if(formElement){
        if(formElement["userName"]){
            this.name = formElement["userName"].value;
        }
        if(formElement["account"]){
            this.account = formElement["account"].value;
        }
        if(formElement["mobilePhone"]){
            this.mobilePhone = formElement["mobilePhone"].value;
        }
        if(formElement["password"]){
            this.password = formElement["password"].value;
        }
    };

    this.isValid = function(){
        return this.name && this.account && this.mobilePhone && this.password;
    };
}
