import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

import AttributeControl from './AttributeControl';
import ClassDetails from './ClassDetails';

const attributeSeed = ATTRIBUTE_LIST.map(att => ({ key: att, value: 10 }));
const classList = Object.keys(CLASS_LIST);

function App() {
  const [attributes, setAttributes] = useState(attributeSeed);
  const [selectedClass, setSelectedClass] = useState(undefined);

  const handleAttributeChange = (attribute, value) => {
    setAttributes(attributes.map(att => att.key === attribute ? { ...att, value } : att));
  }

  const handleClassSelection = (className) => {
    setSelectedClass(CLASS_LIST[className]);
  }

  const doAttributesMeetClassRequirements = (className) => {
    const currentClass = CLASS_LIST[className];
    let isValid = true;
    for (let index in ATTRIBUTE_LIST) {
      const attribute = ATTRIBUTE_LIST[index];
      if (attributes.find(att => att.key === attribute)?.value < currentClass[attribute]){
        isValid = false;
      }
    }

    return isValid;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {classList.map(c => <button className={`btn ${doAttributesMeetClassRequirements(c) ? '' : 'invalidClass'}`} key={c} onClick={() => handleClassSelection(c)}>{c}</button>)}
        <br />
        <ClassDetails classInfo={selectedClass} />
        {attributes.map(att => <AttributeControl key={att.key} label={att.key} value={att.value} setValue={handleAttributeChange} />)}
      </section>
    </div>
  );
}

export default App;
