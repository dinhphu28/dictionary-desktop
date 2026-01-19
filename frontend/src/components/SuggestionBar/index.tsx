import React from "react";

interface SuggestionBarProps {
  suggestions: Array<string>;
  onChange: (value: string) => void;
  value: string;
}

const SuggestionBar: React.FC<SuggestionBarProps> = ({
  suggestions,
  value,
  onChange,
}) => {
  const renderSuggestions = () => {
    return suggestions.map((word) => {
      const isActive = word === value;
      return (
        <li
          key={word}
          className={`suggestion-item ${isActive ? "active" : ""}`}
          tabIndex={0}
          onClick={(_) => onChange(word)}
        >
          {word}
        </li>
      );
    });
  };

  return <ul className="suggestion-list">{renderSuggestions()}</ul>;
};

export default SuggestionBar;
