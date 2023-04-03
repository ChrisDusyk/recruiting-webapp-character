import './SkillListItem.css';

function SkillListItem({ skill, attributes, setValue }) {
  const attributeModifier = attributes.find(att => att.key === skill.attribute)?.modifier;
  return (
    <span className='skillListItem'>
      {skill.key} - points: {skill.points} <button onClick={() => setValue(skill.key, skill.points + 1)}>+</button><button onClick={() => setValue(skill.key, skill.points - 1)}>-</button> modifier ({skill.attribute}): {attributeModifier} total: {skill.points + attributeModifier}
    </span>
  );
}

export default SkillListItem;