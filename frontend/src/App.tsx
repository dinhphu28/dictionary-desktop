import { useEffect, useState } from "react";
import { dictionary } from "../wailsjs/go/models";
import "./App.css";
import LookupBar from "./components/LookupBar";
import { dictionaryTab } from "./components/DictionaryTab/model";
import ContentArea from "./components/ContentArea";
import { Lookup } from "../wailsjs/go/main/App";

function App() {
  const [word, setWord] = useState("hello");
  const [dictResult, setDictResult] =
    useState<dictionary.LookupResultWithSuggestion | null>(null);
  const [selectedDict, setSelectedDict] = useState("oxford_american");

  useEffect(() => {
    lookup();
  }, [word]);

  const lookup = () => {
    Lookup(word).then((result: dictionary.LookupResultWithSuggestion) => {
      setDictResult(result);
    });
  };

  const handleLookup = (word: string) => {
    setWord(word);
  };

  const handleDictSelection = (dictId: string) => {
    setSelectedDict(dictId);
  };

  const handleSelectSuggestWord = (word: string) => {
    setWord(word);
  };

  const getResult = () => {
    if (dictResult == null) {
      throw "Selected dictionary not found in the results!";
    }
    return getSelectedDictResult(dictResult.lookup_results);
  };

  const getSelectedDictResult = (results: Array<dictionary.LookupResult>) => {
    const currentRes = results.find((r) => r.id === selectedDict);
    if (currentRes == null) {
      throw "Selected dictionary not found in the results!";
    }
    return currentRes;
  };

  const dictionarySelections =
    dictResult?.lookup_results?.map(
      (r) =>
        new dictionaryTab.DictionarySelection({
          id: r.id,
          label: r.dictionary,
        }),
    ) ?? [];

  return (
    <div id="app" className="app">
      <LookupBar
        word={word}
        onLookup={handleLookup}
        tabs={dictionarySelections}
        dictionaryId={selectedDict}
        onDictionarySelect={handleDictSelection}
      />
      <div className="main-layout">
        {dictResult != null ? (
          <ContentArea
            suggestions={dictResult.suggestions}
            dictionaryResult={getResult()}
            onSuggestionSelection={handleSelectSuggestWord}
          />
        ) : (
          "Error cause when lookup word!"
        )}
      </div>
    </div>
  );
}

export default App;
