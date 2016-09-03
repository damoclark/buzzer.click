function ParamCheck() {
}

ParamCheck.prototype.type = 'IdentifierUtility';

ParamCheck.prototype.isInstanceAndTypeOf = function(obj, typeOrName) {
    if (typeof obj === 'undefined' || obj == null) {
        return false;
    }

    if (Object.prototype.toString.call(typeOrName).slice(8, -1) === 'String'){
        return Object.prototype.toString.call(obj).slice(8, -1) === typeOrName;
    }

    return (obj instanceof typeOrName);
};

//Export the class
module.exports = ParamCheck;
