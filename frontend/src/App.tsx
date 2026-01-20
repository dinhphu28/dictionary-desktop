import { useEffect, useState } from "react";
import { dictionary } from "../wailsjs/go/models";
import "./App.css";
import LookupBar from "./components/LookupBar";
import { dictionaryTab } from "./components/DictionaryTab/model";
import ContentArea from "./components/ContentArea";
import { Lookup } from "../wailsjs/go/main/App";

function App() {
  const [word, setWord] = useState("");
  const [dictResult, setDictResult] =
    useState<dictionary.LookupResultWithSuggestion | null>(null);
  const [selectedDict, setSelectedDict] = useState("oxford_american");

  useEffect(() => {
    console.log("APP USE EFFECT ---");
    if (word !== "") {
      console.log("Lookup...");
      lookup();
    }
  }, [word]);

  const lookup = () => {
    Lookup(word).then((result: dictionary.LookupResultWithSuggestion) => {
      console.log(result);
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

  if (word === "") {
    return (
      <div id="app" className="app">
        <LookupBar
          onLookup={handleLookup}
          onDictionarySelect={handleDictSelection}
        />
        <div className="main-layout">Word is blank!</div>
      </div>
    );
  }

  if (dictResult == null || dictResult.lookup_results == null) {
    return (
      <div id="app" className="app">
        <LookupBar
          // word={word}
          onLookup={handleLookup}
          onDictionarySelect={handleDictSelection}
        />
        <div className="main-layout">"Error cause when lookup word!"</div>
      </div>
    );
  }

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
