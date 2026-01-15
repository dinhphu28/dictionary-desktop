import { useState } from "react";
import "./App.css";
import "./DefaultStyle.css";
import "./CustomStyle.css";
import { Lookup } from "../wailsjs/go/main/App";
import { dictionary } from "../wailsjs/go/models";

function App() {
  const [dictResult, setDictResult] =
    useState<dictionary.LookupResultWithSuggestion | null>(null);
  const [word, setWord] = useState("");
  const updateWord = (e: any) => setWord(e.target.value);
  const updateDictResult = (result: dictionary.LookupResultWithSuggestion) =>
    setDictResult(result);

  const lookup = () => {
    Lookup(word).then((result: dictionary.LookupResultWithSuggestion) => {
      console.log("WORD: " + word);
      console.log(result);
      updateDictResult(result);
    });
  };

  const metaSentence = () => {
    return (
      <div className="suggest-sentence">
        <i>
          Did you mean: <b>HELLO</b>
        </i>
      </div>
    );
  };

  const renderSetOfDictResult = (results: Array<dictionary.LookupResult>) => {
    const resultHtml = results.map((dict) => (
      <div className="dictionary-section">
        <div className="dictionary-header">
          {dict.dictionary || dict.full_name}
        </div>

        {dict.entries.map((entry) => (
          <div className="dictionary-entry">
            <div
              className="entry-body"
              data-expanded="false"
              dangerouslySetInnerHTML={{ __html: entry.html }}
            ></div>
          </div>
        ))}
      </div>
    ));
    return resultHtml;
  };

  return (
    <div id="App">
      <div id="result" className="result">
        Please enter your headword below 👇
      </div>
      <div id="input" className="input-box">
        <input
          id="name"
          className="input"
          onChange={updateWord}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className="btn" onClick={lookup}>
          Lookup
        </button>
      </div>
      <div>
        <div>{metaSentence()}</div>
        <br />
        <div>
          {dictResult === null
            ? "Error cause when lookup word!"
            : renderSetOfDictResult(dictResult.lookup_results)}
        </div>
      </div>
    </div>
  );
}

export default App;
