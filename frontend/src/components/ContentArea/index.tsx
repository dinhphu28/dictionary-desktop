import React, { useState } from "react";
import { dictionary } from "../../../wailsjs/go/models";
import DictionaryContent from "../DictionaryContent";
import "./style.css";

interface ContentAreaProps {
  suggestions: Array<string>;
  dictionaryResult: dictionary.LookupResult;
  onSuggestionSelection: (word: string) => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  suggestions,
  dictionaryResult,
  onSuggestionSelection,
}) => {
  const [currentWord, setCurrentWord] = useState(suggestions[0]);

  const changeSelection = (word: string) => {
    setCurrentWord(word);
    onSuggestionSelection(word);
  };

  const renderSuggestions = () => {
    return suggestions.map((word) => {
      const isActive = word === currentWord;
      return (
        <li
          key={word}
          className={`suggestion-item ${isActive ? "active" : ""}`}
          tabIndex={0}
          onClick={(_) => changeSelection(word)}
        >
          {word}
        </li>
      );
    });
  };

  return (
    <section className="content-area">
      <aside className="suggestions">
        <ul className="suggestion-list">{renderSuggestions()}</ul>
      </aside>
      <main className="definition-view">
        <DictionaryContent dictionaryResult={dictionaryResult} />
      </main>
    </section>
  );
};

export default ContentArea;
