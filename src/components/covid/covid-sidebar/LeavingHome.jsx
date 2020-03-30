import React, { useState } from "react";
import { RadioGroup, Radio } from "baseui/radio";


export default (props) => {
  const [value, setValue] = useState("symptoms");
  return (
    <RadioGroup
      value={value}
      onChange={e => { 
        setValue(e.target.value); 
        typeof props.onSelectCallback === "function" && 
          props.onSelectCallback("self_isolation_steps", e.target.value) 
      }}
      name="number"
    >
      <Radio value="symptoms">Symptoms</Radio>
      <Radio
        value="2"
        description="This is a radio description"
      >
        Two
      </Radio>
      <Radio value="3">Three</Radio>
    </RadioGroup>
  );
}