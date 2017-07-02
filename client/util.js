export function cloneObj(obj) {
    let clone;
    if (obj instanceof Array) {
        clone = [];
        for (let i = 0; i < obj.length; i++) {
        	if(obj[i] instanceof Object){
        		clone[i] = cloneObj(obj[i]);
        	}else{
        		clone[i] = obj[i];
        	}
            
        }
        return clone;
    }
    if (obj instanceof Object) {
        clone = {};
        for (let key in obj) {
        	if(obj[key] instanceof Object){
        		clone[key] = cloneObj(obj[key]);
        	}else{
        		clone[key] = obj[key];
        	}
        }
        return clone;
    }
}