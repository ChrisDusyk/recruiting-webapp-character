import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

import AttributeControl from './AttributeControl';
import ClassDetails from './ClassDetails';
import SkillListItem from './SkillListItem';

const API_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/ChrisDusyk/character'

const attributeSeed = ATTRIBUTE_LIST.map(att => ({ key: att, value: 10, modifier: 0 }));
const classList = Object.keys(CLASS_LIST);
const skillSeed = SKILL_LIST.map(skill => ({ key: skill.name, points: 0, attribute: skill.attributeModifier}))

const calculateAttributeModifier = (value) => Math.floor((value - 10) / 2);

function App() {
  const [attributes, setAttributes] = useState(attributeSeed);
  const [selectedClass, setSelectedClass] = useState(undefined);
  const [skills, setSkills] = useState(skillSeed);

  const handleAttributeChange = (attribute, value) => {
    setAttributes(attributes.map(att => att.key === attribute ? { ...att, value, modifier: calculateAttributeModifier(value) } : att));
  }

  const handleSkillChange = (skill, value) => {
    setSkills(skills.map(sk => sk.key === skill ? { ...sk, points: value } : sk));
  }

  const handleClassSelection = (className) => {
    setSelectedClass(CLASS_LIST[className]);
  }

  const handleSave = () => {
    fetch(API_URL, { 
      method: 'POST',
      body: JSON.stringify({ attributes, skills, selectedClass }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const handleLoad = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setAttributes(data.body.attributes);
    setSkills(data.body.skills);
    setSelectedClass(data.body.selectedClass);
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
        <br />
        <h3>Skills</h3>
        <>
          {skills.map(skill => <SkillListItem key={skill.key} attributes={attributes} skill={skill} setValue={handleSkillChange} />)}
        </>
        <button type='submit' onClick={handleSave}>Save</button>
        <button onClick={handleLoad}>Load</button>
      </section>
    </div>
  );
}

export default App;
