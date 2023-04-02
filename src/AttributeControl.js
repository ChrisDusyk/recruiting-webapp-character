function AttributeControl({ value, setValue, label }) {
    return (
        <div>
          {label}: {value}
          <br />
          <button onClick={() => setValue(label, value + 1)}>+</button>
          <button onClick={() => setValue(label, value - 1)}>-</button>
        </div>
    );
}

export default AttributeControl;