/**
 * Created by yaohui on 15-3-29.
 */

var NAV = {
    current : undefined
}
var navEle = document.getElementById("nav");


EventUtil.addHandler(navEle, "click", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if('A' == target.tagName){
        var href = target.href;
        var httpReg = /.*#/;

        if(!httpReg.test(href)){
            EventUtil.preventDefault(event);
            Ajax.load(document.getElementById("contentPanel"), target.href);
        }
    }
});