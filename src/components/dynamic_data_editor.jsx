export default function DynamicDataEditor2({data , setData}){
 const fields = Object.entries(data).map(([name, value])=>{
    if (value && typeof value === 'object' && value.type === value.name){
        return null
    }

    let type = "string";
    if (typeof value === 'number') type = "number";
    else if (typeof value === 'boolean') type = "boolean";
    else if (Array.isArray(value)) type = "array";
    else if (typeof value === 'object') type = "object";
    return {name, value, type}

 })


 const handleFieldChange = (idx, newField)=>{
    const newFields = [...fields]
    newFields[idx] = newFiedl

 }
}