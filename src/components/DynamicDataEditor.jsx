import React, { useState } from "react";

// EN: Supported field types for dynamic data editor
// HI: Dynamic data editor ke liye supported field types
const FIELD_TYPES = [
  "string",
  "number",
  "boolean",
  "array",
  "object",
  "image"
];


// -------------------------------------------------------------
// EN: FieldEditor - Renders each field based on its type (recursive for nested fields)
// HI: FieldEditor - Har field ko uske type ke hisab se render karta hai (nested fields ke liye recursive)
// -------------------------------------------------------------
function FieldEditor({ field, onChange, onRemove }) {
  const { name, type, value } = field;

  // EN: Handle value change for primitive types
  // HI: Primitive types ke liye value change handle kare
  const handleValueChange = (e) => {
    let val = e.target.value;
    if (type === "number") val = Number(val);
    if (type === "boolean") val = val === "true";
    onChange({ ...field, value: val });
  };

  // EN: For array type, render each item recursively and allow adding/removing items
  // HI: Array type ke liye, har item ko recursively render kare aur add/remove ka option de
  if (type === "array") {
    return (
      <div className="ml-4 border-l pl-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">{name} (Array)</span>
          <button type="button" className="text-red-500 text-xs" onClick={onRemove}>Remove</button>
        </div>
        {Array.isArray(value) &&
          value.map((item, idx) => (
            <FieldEditor
              key={idx}
              field={item}
              onChange={(newItem) => {
                const newArr = [...value];
                newArr[idx] = newItem;
                onChange({ ...field, value: newArr });
              }}
              onRemove={() => {
                const newArr = value.filter((_, i) => i !== idx);
                onChange({ ...field, value: newArr });
              }}
            />
          ))}
        <AddFieldButton
          onAdd={(newField) =>
            onChange({ ...field, value: [...(value || []), newField] })
          }
        />
      </div>
    );
  }

  // EN: For object type, render each key-value pair recursively and allow adding/removing keys
  // HI: Object type ke liye, har key-value pair ko recursively render kare aur add/remove ka option de
  if (type === "object") {
    return (
      <div className="ml-4 border-l pl-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">{name} (Object)</span>
          <button type="button" className="text-red-500 text-xs" onClick={onRemove}>Remove</button>
        </div>
        {value &&
          Object.entries(value).map(([key, val], idx) => (
            <FieldEditor
              key={key}
              field={val}
              onChange={(newField) => {
                onChange({
                  ...field,
                  value: { ...value, [key]: newField }
                });
              }}
              onRemove={() => {
                const newObj = { ...value };
                delete newObj[key];
                onChange({ ...field, value: newObj });
              }}
            />
          ))}
        <AddFieldButton
          onAdd={(newField) =>
            onChange({
              ...field,
              value: { ...value, [newField.name]: newField }
            })
          }
        />
      </div>
    );
  }

  // EN: For image type, render a text input for image URL
  // HI: Image type ke liye, image URL ke liye text input render kare
  if (type === "image") {
    return (
      <div className="mb-2 flex items-center gap-2">
        <span className="font-semibold">{name} (Image URL)</span>
        <input
          type="text"
          value={value || ""}
          onChange={handleValueChange}
          className="border px-2 py-1 rounded w-full"
        />
        <button type="button" className="text-red-500 text-xs" onClick={onRemove}>Remove</button>
      </div>
    );
  }

  // EN: For primitive types (string, number, boolean), render appropriate input
  // HI: Primitive types (string, number, boolean) ke liye sahi input render kare
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="font-semibold">{name} ({type})</span>
      {type === "boolean" ? (
        <select value={value ? "true" : "false"} onChange={handleValueChange} className="border px-2 py-1 rounded">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      ) : (
        <input
          type={type === "number" ? "number" : "text"}
          value={value || ""}
          onChange={handleValueChange}
          className="border px-2 py-1 rounded w-full"
        />
      )}
      <button type="button" className="text-red-500 text-xs" onClick={onRemove}>Remove</button>
    </div>
  );
}


// -------------------------------------------------------------
// EN: AddFieldButton - UI for adding new fields (with type selection)
// HI: AddFieldButton - Naya field add karne ka UI (type select kar sakte hain)
// -------------------------------------------------------------
function AddFieldButton({ onAdd }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("string");

  // EN: Handle add field logic based on selected type
  // HI: Selected type ke hisab se field add karne ka logic
  const handleAdd = () => {
    if (!name) return;
    let value;
    if (type === "array") value = [];
    else if (type === "object") value = {};
    else if (type === "boolean") value = false;
    else value = "";
    onAdd({ name, type, value });
    setName("");
    setType("string");
    setShow(false);
  };

  return show ? (
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        placeholder="Field Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border px-2 py-1 rounded w-1/3"
      />
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className="border px-2 py-1 rounded w-1/3"
      >
        {FIELD_TYPES.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <button
        type="button"
        className="bg-green-500 text-white px-3 py-1 rounded"
        onClick={handleAdd}
      >
        Add
      </button>
      <button
        type="button"
        className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
        onClick={() => setShow(false)}
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      type="button"
      className="text-xs bg-blue-100 px-2 py-1 rounded mt-2"
      onClick={() => setShow(true)}
    >
      + Add Field
    </button>
  );
}


// -------------------------------------------------------------
// EN: AdvancedDynamicDataEditor - Main component for editing nested service data
// HI: AdvancedDynamicDataEditor - Nested service data edit karne ka main component
// -------------------------------------------------------------
export default function AdvancedDynamicDataEditor({ data, setData }) {
  // EN: Convert data object to array of fields for easier editing
  // HI: Data object ko fields ki array me convert kare editing ke liye
  const fields = Object.entries(data).map(([name, val]) => {
    if (val && typeof val === "object" && val.type && val.name) {
      return val;
    }
    // EN: Guess type if not present
    // HI: Type nahi hai toh guess kare
    let type = "string";
    if (typeof val === "number") type = "number";
    else if (typeof val === "boolean") type = "boolean";
    else if (Array.isArray(val)) type = "array";
    else if (typeof val === "object") type = "object";
    return { name, type, value: val };
  });

  // EN: Handle field change (update field value)
  // HI: Field change handle kare (field value update kare)
  const handleFieldChange = (idx, newField) => {
    // idx means index of the field in the fields array
    // const newfields = [...fields]; means copy the fields array
    const newFields = [...fields];
    newFields[idx] = newField;
    // EN: Convert back to object for saving
    // HI: Save karne ke liye wapas object me convert kare
    const newData = {};
    newFields.forEach(f => {
      newData[f.name] = f;
    });
    setData(newData);
  };

  // EN: Handle field remove (delete field)
  // HI: Field remove handle kare (field delete kare)
  const handleFieldRemove = (idx) => {
    const newFields = fields.filter((_, i) => i !== idx);
    const newData = {};
    newFields.forEach(f => {
      newData[f.name] = f;
    });
    setData(newData);
  };

  // EN: Handle add field (add new field to data)
  // HI: Add field handle kare (data me naya field add kare)
  const handleAddField = (newField) => {
    const newData = { ...data, [newField.name]: newField };
    setData(newData);
  };

  return (
    <div>
      {/* EN: Heading for advanced editor | HI: Advanced editor ka heading */}
      <h4 className="font-bold mb-2">Service Data (Advanced/Nested)</h4>
      {fields.map((field, idx) => (
        <FieldEditor
          key={field.name}
          field={field}
          onChange={newField => handleFieldChange(idx, newField)}
          onRemove={() => handleFieldRemove(idx)}
        />
      ))}
      <AddFieldButton onAdd={handleAddField} />
    </div>
  );
}