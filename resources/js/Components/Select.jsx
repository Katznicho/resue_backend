import React from "react";
import CreatableSelect from "react-select/creatable";

const options = [
  { value: "asthma", label: "Asthma" },
  { value: "diabetes", label: "Diabetes" },
  { value: "high-blood-pressure", label: "High Blood Pressure" },
  { value: "arthritis", label: "Arthritis" },
  { value: "migraine", label: "Migraine" },
  { value: "allergies", label: "Allergies" },
  // Add more medical conditions here
];

export const MedicalConditionsInput = ({ value, onChange, medical_conditions, setData }) => {

  const handleChange = (newValue, actionMeta) => {
    //  console.log(newValue);
    if (actionMeta.action === "create-option") {
      //const newOption = { value: newValue.value, label: newValue.label };
      onChange(newValue);
      //onChange(prevState=>[...prevState, { value: newValue.value, label: newValue.label }])
    } else {
      onChange(newValue);
      //onChange(prevState=>[...prevState , newValue])
    }
    setData("medical_conditions",medical_conditions);
  };

  return (
    <CreatableSelect
      isMulti
      options={options}
      value={value}
      onChange={handleChange}
      placeholder="Select or add medical conditions"
      isClearable
      isSearchable
      allowCreateWhileLoading
    />
  );
};
