import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

import AttributeControl from './AttributeControl';

const attributeSeed = ATTRIBUTE_LIST.map(att => ({ key: att, value: 10 }));

function App() {
  const [attributes, setAttributes] = useState(attributeSeed);

  const handleAttributeChange = (attribute, value) => {
    setAttributes(attributes.map(att => att.key === attribute ? { ...att, value } : att));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {attributes.map(att => <AttributeControl key={att.key} label={att.key} value={att.value} setValue={handleAttributeChange} />)}
      </section>
    </div>
  );
}

export default App;
