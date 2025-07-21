"use client";
import "./globals.css";

import { useState } from "react";

export default function Home() {
  const [variables, setVariables] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  const fontList = [
    "Arial",
    "Helvetica",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "Verdana",
  ];

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setValue("");
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const generateVarName = (type) => {
    const count = variables.filter((v) => v.type === type).length;
    const names = ["primary", "secondary", "tertiary", "quaternary", "quinary"];
    return `--${type}-${names[count] || "custom"}`;
  };

  const handleAdd = () => {
    if (!selectedType || !value) return;
    const name = generateVarName(selectedType);
    const newVar = { name, value, type: selectedType };
    setVariables([...variables, newVar]);
    setSelectedType("");
    setValue("");
  };

  const handleDelete = (name) => {
    setVariables(variables.filter((v) => v.name !== name));
  };

  const handleCopy = () => {
    const cssVars = variables.map((v) => `  ${v.name}: ${v.value};`);
    const root = `:root {cssVars}`;
    navigator.clipboard.writeText(root);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto bg-stone-100 px-3.5 md:min-h-[95vh] min-h-[95%] min-w-[95%] rounded-2xl border shadow-2xl shadow-rose-800">
      <h1 className="text-2xl font-bold mb-4">CSS Variable Manager</h1>

      <div className="flex gap-4 mb-4 w-full">
        <select
          className="border px-3 py-2 rounded w-40"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Select Type</option>
          <option value="bg">Background</option>
          <option value="text">Text</option>
          <option value="font">Font</option>
        </select>

        {selectedType && selectedType !== "font" && (
          <input
            type="color"
            className="w-12 h-10 border rounded"
            value={value}
            onChange={handleValueChange}
          />
        )}

        {selectedType === "font" && (
          <select
            className="border px-3 py-2 rounded"
            value={value}
            onChange={handleValueChange}
          >
            <option value="">Select Font</option>
            {fontList.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="mb-2.5">
        <button
          className="bg-rose-600 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add Variable
        </button>
      </div>

      <div className="space-y-2 mb-6">
        {variables.map((v, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
          >
            <span className="text-sm">
              {v.name}: <span className="font-mono">{v.value}</span>
            </span>
            <button
              className="text-red-500 hover:text-red-700 text-sm"
              onClick={() => handleDelete(v.name)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <pre className="mt-4 p-4 bg-gray-800 text-white rounded overflow-auto text-sm">
        <code>
          :root {"{"}
          {variables.map((v) => `\n  ${v.name}: ${v.value};\n`)}
          {"}"}
        </code>
      </pre>
      <br />
      <button
        onClick={handleCopy}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {copied ? "Copied!" : "Copy CSS"}
      </button>
    </main>
  );
}
