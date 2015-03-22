/**
 * Created by yaohui on 15-3-22.
 */
var Ajax = {
    createXHR: function(){
        if(typeof XMLHttpRequest != "undefined"){
            return new XMLHttpRequest();
        }else if(typeof ActiveXObject != "undefined"){
            if(typeof arguments.callee.activeXString != "string"){
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
                for(var i= 0, len = versions.length; i<len; i++){
                    try{
                        var xhr = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    }catch (ex){
                        //skip
                    }
                }
            }
        }else{
            throw new Error("No XHR object available.");
        }
    },
    postJson: function(object, url, callback){
        var xhr = this.createXHR();
        //set listener before open.
        xhr.onreadystatechange = function(event){
            //alert(xhr.readyState);
            if(xhr.readyState == 4){
                var ajaxResult = new AjaxResult(JSON.parse(xhr.responseText), xhr.status,xhr.responseText);
                callback(ajaxResult);
            }
        };
        xhr.open("post", url, false);
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.send(JSON.stringify(object));
    },
    load : function(targetElement, url){
        var xhr = this.createXHR();
        //set listener before open.
        xhr.onreadystatechange = function(event){
            //alert(xhr.readyState);
            if(xhr.readyState == 4){
                //var ajaxResult = new AjaxResult(JSON.parse(xhr.responseText), xhr.status,xhr.responseText);
                targetElement.innerHTML = xhr.responseText;
            }
        };
        xhr.open("get", url, false);
        xhr.send(null);
    },
    loadList : function(url, callback){
        var xhr = this.createXHR();
        //set listener before open.
        xhr.onreadystatechange = function(event){
            if(xhr.readyState == 4){
                var ajaxResult = new AjaxResult(JSON.parse(xhr.responseText), xhr.status,xhr.responseText);
                callback(ajaxResult);
            }
        };
        xhr.open("get", url, false);
        xhr.send(null);
    }
};

function AjaxResult( data, status, responseText){
    this.data = data;
    this.status = status;
    //debug infomation.
    this.responseText;

    if(this.status >= 200 && this.status < 300 || this.status == 304){
        this.isSuccess = true;
    }else{
        this.isSuccess = false;
    }
};
