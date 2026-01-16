import React, { KeyboardEvent, useState } from "react";
import { Lookup } from "../../../wailsjs/go/main/App";
import { dictionary } from "../../../wailsjs/go/models";
import "./style.css";

interface LookupBarProps {
  onLookupResult: (result: dictionary.LookupResultWithSuggestion) => void;
}

const LookupBar: React.FC<LookupBarProps> = ({ onLookupResult }) => {
  const [word, setWord] = useState("");
  const updateWord = (e: any) => setWord(e.target.value);

  const updateDictResult = (result: dictionary.LookupResultWithSuggestion) =>
    onLookupResult(result);

  const lookup = () => {
    Lookup(word).then((result: dictionary.LookupResultWithSuggestion) => {
      console.log("WORD: " + word);
      console.log(result);
      updateDictResult(result);
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      lookup();
    }
  };

  const clear = () => {
    setWord("");
  };

  return (
    <div>
      <div className="top-bar">
        <header className="lookup-bar">
          <span className="search-icon">🔍</span>
          <input
            id="name"
            value={word}
            className="lookup-input"
            onChange={updateWord}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            name="input"
            type="text"
            placeholder="Lookup"
          />
          <button className="clear-btn" onClick={clear}>
            x
          </button>
        </header>
      </div>
    </div>
  );
};

export default LookupBar;
