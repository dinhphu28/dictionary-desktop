import React, { KeyboardEvent, useState } from "react";
import { Lookup } from "../../../wailsjs/go/main/App";
import { dictionary } from "../../../wailsjs/go/models";
import DictionaryTab from "../DictionaryTab";
import { dictionaryTab } from "../DictionaryTab/model";
import LookupInput from "../LookupInput";
import "./style.css";

interface LookupBarProps {
  onLookupResult: (result: dictionary.LookupResultWithSuggestion) => void;
  tabs: Array<dictionaryTab.DictionarySelection>;
}

const LookupBar: React.FC<LookupBarProps> = ({ onLookupResult, tabs }) => {
  const [word, setWord] = useState("");
  const [selectedDict, setSelectedDict] = useState("oxford_american");
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

  const handleDictSelection = (dictId: string) => {
    setSelectedDict(dictId);
  };

  return (
    <div>
      <header>
        <div className="top-bar">
          <LookupInput
            className="lookup-bar"
            onChange={updateWord}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* <DictionaryTab */}
        {/*   dictionaries={tabs} */}
        {/*   defaultDictionary={selectedDict} */}
        {/*   onDictionarySelection={handleDictSelection} */}
        {/* /> */}
      </header>
    </div>
  );
};

export default LookupBar;
