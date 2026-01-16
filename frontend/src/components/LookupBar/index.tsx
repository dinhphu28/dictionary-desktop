import React, { KeyboardEvent, useState } from "react";
import { Lookup } from "../../../wailsjs/go/main/App";
import { dictionary } from "../../../wailsjs/go/models";
import { dictionaryTab } from "../DictionaryTab/model";
import LookupInput from "../LookupInput";
import NavTab, { Tab } from "../NavTab";
import "./style.css";

interface LookupBarProps {
  tabs: Array<dictionaryTab.DictionarySelection>;
  onLookup: (word: string) => void;
  onDictionarySelect: (dictId: string) => void;
}

const LookupBar: React.FC<LookupBarProps> = ({ onLookup, tabs }) => {
  const [word, setWord] = useState("");
  const [selectedDict, setSelectedDict] = useState("oxford_american");
  const updateWord = (e: any) => setWord(e.target.value);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onLookup(word);
    }
  };

  const handleDictSelection = (dictId: string) => {
    console.log("DICT: ", dictId);
    setSelectedDict(dictId);
  };

  const renderTabs = () => {
    return tabs.map((tab) => <Tab value={tab.id} label={tab.label} />);
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
        <NavTab value={selectedDict} onChange={handleDictSelection}>
          {renderTabs()}
        </NavTab>
      </header>
    </div>
  );
};

export default LookupBar;
