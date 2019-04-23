// 05 Context
DOT = function(obj, prop){
    if(obj.hasOwnProperty(prop)){
        return obj[prop];
    }
    else {
        return DOT(obj.__proto__, prop);
    }
};
//otherwise keep walking up proto chain
 
// 05 Context
DOTCALL = function(obj, prop, args){
    var fn = DOT(obj, prop);
    
    if(fn) {
       // fn.call(context, 1,2,3);
       //for this example apply is most appropriate as we are dealing with an array
       //eg: fn.apply(context, [1,2,3])
       return fn.apply(obj, args);
    }
 
}
 
// 06 Prototypes
NEW = function(constructor, args){
    //create a new object
    //set new object's __proto__ to constructor's prototype
    // invoke our constructor with our new object as context
    //return our new object
    var o = {};
    o.__proto__ = constructor.prototype;
    constructor.apply(0, args);
    
    return o;
 
};
 
INSTANCEOF = function(obj, constructor){
    if(obj.__proto__ === constructor.prototype) {
        return true
    } else if(obj.__proto__) {
        return INSTANCEOF(obj.__proto__, constructor);
    } else {
        return false;
    }
 
};