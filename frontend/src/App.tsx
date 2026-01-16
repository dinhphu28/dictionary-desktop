import { useState } from "react";
import { dictionary } from "../wailsjs/go/models";
import "./App.css";
import LookupBar from "./components/LookupBar";
import DictionaryTab from "./components/DictionaryTab";
import { dictionaryTab } from "./components/DictionaryTab/model";
import ContentArea from "./components/ContentArea";

function App() {
  const [dictResult, setDictResult] =
    useState<dictionary.LookupResultWithSuggestion | null>(null);
  const [selectedDict, setSelectedDict] = useState("oxford_american");

  const handleLookup = (result: dictionary.LookupResultWithSuggestion) => {
    setDictResult(result);
  };

  const handleDictSelection = (dictId: string) => {
    setSelectedDict(dictId);
  };

  const handleSelectSuggestWord = (word: string) => {
    console.log(word);
  };

  const MatchType = {
    EXACT_MATCH: 1,
    APPROXIMATE_MATCH: 2,
  };

  const metaSentence = () => {
    const suggestWord = dictResult?.suggestions?.at(0);

    if (suggestWord != null) {
      return (
        <div className="suggest-sentence">
          <i>
            Did you mean: <b>{suggestWord}</b>?
          </i>
        </div>
      );
    }
    return "";
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
      <LookupBar onLookupResult={handleLookup} />
      <DictionaryTab
        dictionaries={dictionarySelections}
        defaultDictionary={selectedDict}
        onDictionarySelection={handleDictSelection}
      />
      <div className="main-layout">
        {dictResult != null ? (
          <ContentArea
            suggestions={dictResult.suggestions}
            dictionaryResult={getSelectedDictResult(dictResult.lookup_results)}
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
