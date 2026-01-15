import React, { KeyboardEvent, useState } from "react";
import { Lookup } from "../../../wailsjs/go/main/App";
import { dictionary } from "../../../wailsjs/go/models";

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

  return (
    <div>
      <div id="input" className="input-box">
        <input
          id="name"
          className="input"
          onChange={updateWord}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className="btn" onClick={lookup}>
          Lookup
        </button>
      </div>
    </div>
  );
};

export default LookupBar;
