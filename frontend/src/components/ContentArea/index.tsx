import React, { useState } from "react";
import { dictionary } from "../../../wailsjs/go/models";
import DictionaryContent from "../DictionaryContent";
import SuggestionBar from "../SuggestionBar";
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
  const changeSelection = (word: string) => {
    onSuggestionSelection(word);
  };

  return (
    <section className="content-area">
      <aside className="suggestions">
        {suggestions.length > 0 ? (
          <SuggestionBar
            suggestions={suggestions}
            value={suggestions[0]}
            onChange={changeSelection}
          />
        ) : (
          ""
        )}
      </aside>
      <main className="definition-view">
        <DictionaryContent dictionaryResult={dictionaryResult} />
      </main>
    </section>
  );
};

export default ContentArea;
