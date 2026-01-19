import React, { KeyboardEvent, useEffect, useState } from "react";
import "./style.css";

interface LookupInputProps {
  value: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const LookupInput: React.FC<LookupInputProps> = ({
  value,
  className,
  onChange,
  onKeyDown,
}) => {
  const [word, setWord] = useState(value);
  const updateWord = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWord(e.target.value);

  const clear = () => {
    setWord("");
  };

  useEffect(() => {
    setWord(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateWord(e);
    onChange(e);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown(event);
  };

  const classes = `lookup-input ${className}`;

  return (
    <div className={classes}>
      <span className="search-icon">🔍</span>
      <input
        value={word}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        name="input"
        type="text"
        placeholder="Lookup"
      />
      <button className="clear-btn" onClick={clear}>
        x
      </button>
    </div>
  );
};

export default LookupInput;
