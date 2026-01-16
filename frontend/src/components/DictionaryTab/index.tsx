import React, { useState } from "react";
import { dictionaryTab } from "./model";

interface DictionaryTabProps {
  dictionaries: Array<dictionaryTab.DictionarySelection>;
  defaultDictionary: string;
  onDictionarySelection: (dictionaryId: string) => void;
}

const DictionaryTab: React.FC<DictionaryTabProps> = ({
  dictionaries,
  defaultDictionary,
  onDictionarySelection,
}) => {
  const [selectedDict, setSelectedDict] = useState(defaultDictionary);

  const changeSelection = (dictId: string) => {
    setSelectedDict(dictId);
    onDictionarySelection(dictId);
  };

  const renderDict = () => {
    return dictionaries.map((dict) => {
      const isActive = dict.id === selectedDict;

      return (
        <button
          className={`tab ${isActive ? "active" : ""}`}
          onClick={(_) => changeSelection(dict.id)}
        >
          {dict.label}
        </button>
      );
    });
  };

  return <nav className="dictionary-tabs">{renderDict()}</nav>;
};

export default DictionaryTab;
