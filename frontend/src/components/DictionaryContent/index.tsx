import { dictionary } from "../../../wailsjs/go/models";
import "../../DefaultStyle.css";
import "../../CustomStyle.css";

interface DictionaryContentProps {
  dictionaryResult: dictionary.LookupResult;
}

const DictionaryContent: React.FC<DictionaryContentProps> = ({
  dictionaryResult,
}) => {
  return (
    <div className="dictionary-section">
      <div className="dictionary-header">
        {dictionaryResult.dictionary || dictionaryResult.full_name}
      </div>

      {dictionaryResult.entries.map((entry) => (
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

export default DictionaryContent;
