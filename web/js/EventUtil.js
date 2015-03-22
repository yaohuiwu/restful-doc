/**
 * Created by yaohui on 15-3-22.
 */
var EventUtil = {

    /**
     * Add event handler to an element.
     * @param element
     * @param type
     * @param handler
     */
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            element.attachEvent(type, "on" + type, handler);
        }else{
            element["on" + type] = handler;
        }
    },

    /**
     * Remove event handler from an element.
     * @param element
     * @param type
     * @param handler
     */
    removeHandler: function(element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }else if(element.detachEvent){
            element.detachEvent(type, "on" + type, handler);
        }else{
            element["on" + type] = null;
        }
    },

    getEvent: function(event){
        return event ? event : window.event;
    },

    getTarget: function(event){
        return event.target || event.srcElement;
    },

    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            return event.returnValue = false;
        }
    }

};