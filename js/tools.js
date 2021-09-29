function animation(obj,attr,target,speed,callback){

    var current = parseInt(getComputedStyle(obj)[attr]);
    
    if(current > target){
        speed=-speed;
        
    }

    
    obj.timer = setInterval(() => {
        
        var oldValue = parseInt(getComputedStyle(obj)[attr]);
        var newValue = oldValue + speed;
        
        if(speed > 0 && newValue > target || speed < 0  && newValue < target ){
            newValue = target;
        }  

        obj.style[attr]= newValue + "px";

        if(newValue == target){
            clearInterval(obj.timer);
            callback();
        }
    },10);
}