import { useState } from "react";
import "./DefaultStyle.css";
import "./CustomStyle.css";
import { dictionary } from "../wailsjs/go/models";
import LookupBar from "./components/LookupBar";
import DictionaryTab from "./components/DictionaryTab";
import { dictionaryTab } from "./components/DictionaryTab/model";

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

  const MatchType = {
    EXACT_MATCH: 1,
    APPROXIMATE_MATCH: 2,
  };

  // if (dictResult?.lookup_results?.length ?? 0 === 0) {
  //   return <i>No entry found for "WORD".</i>;
  // }

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

  const renderSetOfDictResult = (results: Array<dictionary.LookupResult>) => {
    return results.map(renderSelectedDictResult);
  };

  const renderSelectedDictResult = (result: dictionary.LookupResult) => {
    return (
      <div className="dictionary-section">
        <div className="dictionary-header">
          {result.dictionary || result.full_name}
        </div>

        {result.entries.map((entry) => (
          <div className="dictionary-entry">
            <div
              className="entry-body"
              data-expanded="false"
              dangerouslySetInnerHTML={{ __html: entry.html }}
            ></div>
          </div>
        ))}
      </div>
    );
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
    <div id="App">
      <div id="result" className="result">
        Please enter your headword below 👇
      </div>
      <LookupBar onLookupResult={handleLookup} />
      <DictionaryTab
        dictionaries={dictionarySelections}
        defaultDictionary={selectedDict}
        onDictionarySelection={handleDictSelection}
      />
      <div>
        <div>{metaSentence()}</div>
        <br />
        <div>
          {dictResult != null
            ? renderSetOfDictResult(dictResult.lookup_results)
            : "Error cause when lookup word!"}
        </div>
      </div>
    </div>
  );
}

export default App;
