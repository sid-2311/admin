function flattenFields(obj , prefix = ""){
    let fields = [];

   if (Array.isArray(obj)){
    obj.forEach((item, idx) => {
       const arrPrefix = prefix ? `${prefix}[${idx}]` : `[${idx}]`;
       if (typeof item === "object" && item !== null){
        fields = fields.concat(flattenFields(item, arrPrefix));
       }
   })
}
}

function getValueByPath(obj, path){
    if (!path) return "";

    const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".");

    let val = obj;
    for(let p of parts){
        if(val == null) return "";
        val = val[p];
    }
    return val;
}