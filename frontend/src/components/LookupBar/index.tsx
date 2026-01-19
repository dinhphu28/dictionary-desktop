import React, { KeyboardEvent, useEffect, useState } from "react";
import { Lookup } from "../../../wailsjs/go/main/App";
import { dictionary } from "../../../wailsjs/go/models";
import { dictionaryTab } from "../DictionaryTab/model";
import LookupInput from "../LookupInput";
import NavTab, { Tab } from "../NavTab";
import "./style.css";

interface LookupBarProps {
  word: string;
  tabs: Array<dictionaryTab.DictionarySelection>;
  onLookup: (word: string) => void;
  dictionaryId: string;
  onDictionarySelect: (dictId: string) => void;
}

const LookupBar: React.FC<LookupBarProps> = ({
  word,
  tabs,
  onLookup,
  dictionaryId,
  onDictionarySelect,
}) => {
  let localWord = word;
  const updateLocalWord = (e: any) => (localWord = e.target.value);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onLookup(localWord);
    }
  };

  const handleDictSelection = (dictId: string) => {
    onDictionarySelect(dictId);
  };

  const renderTabs = () => {
    return tabs.map((tab) => (
      <Tab key={tab.id} value={tab.id} label={tab.label} />
    ));
  };

  return (
    <div>
      <header>
        <div className="top-bar">
          <LookupInput
            value={localWord}
            className="lookup-bar"
            onChange={updateLocalWord}
            onKeyDown={handleKeyDown}
          />
        </div>
        <NavTab value={dictionaryId} onChange={handleDictSelection}>
          {renderTabs()}
        </NavTab>
      </header>
    </div>
  );
};

export default LookupBar;
