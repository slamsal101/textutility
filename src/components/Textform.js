import React, { useEffect, useState, useMemo, useCallback } from "react";

const TextButtons = React.memo(function TextButtons({
  onUpper,
  onLower,
  onCopy,
  onExtraSpaces,
  onClear,
}) {
  console.log("TextButtons rendered");
  return (
    <div>
      <button className="btn btn-primary mx-1" onClick={onUpper}>
        Convert to Uppercase
      </button>
      <button className="btn btn-secondary mx-1" onClick={onLower}>
        Convert to Lowercase
      </button>
      <button className="btn btn-success mx-1" onClick={onCopy}>
        Copy Text
      </button>
      <button className="btn btn-danger mx-1" onClick={onExtraSpaces}>
        Remove Extra Spaces
      </button>
      <button className="btn btn-danger mx-1" onClick={onClear}>Clear Text</button>
    </div>
  );
});

export default function TextForm(props) {
  const [text, setText] = useState("Enter text here");

  
  const handleUpClick = useCallback(() => {
    // convert current text to uppercase (using functional setState is safer)
    setText((prev) => prev.toUpperCase());
    // no deps needed because setText is stable and we use functional update
  }, []);

  const handleLowClick = useCallback(() => {
    setText((prev) => prev.toLowerCase());
  }, []);

  const handleClearClick = useCallback(() => {
    setText("");
  }, []);

  // handleCopy needs current `text` so include it in deps
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => {
        // optional non-blocking feedback
        // console.log("Copied to clipboard");
      },
      (err) => {
        console.error("Copy failed", err);
      }
    );
  }, [text]);

  // use functional update to compute new text from previous value
  const handleExtraSpaces = useCallback(() => {
    setText((prev) => prev.split(/[ ]+/).join(" ").trim());
  }, []);

  // onChange handler (stable)
  const handleOnChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  

  // Derived values (memoized with useMemo)
  

  // Trimmed text used by multiple derived values
  const trimmedText = useMemo(() => text.trim(), [text]);

  const wordCount = useMemo(() => {
    return trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;
  }, [trimmedText]);

  const charCount = useMemo(() => text.length, [text]);

  // approximate reading time (minutes)
  const readingTime = useMemo(() => {
    // 0.008 minutes per word = ~125 words/min (approx)
    return (wordCount * 0.008).toFixed(2);
  }, [wordCount]);

  

  // Side effects
  

  useEffect(() => {
    if (text.length === 50) {
      alert("Text is too long!");
    }
  }, [text]);

  
  // Render
  
  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>

        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>

        {/* memoized button component */}
        <TextButtons
          onUpper={handleUpClick}
          onLower={handleLowClick}
          onCopy={handleCopy}
          onExtraSpaces={handleExtraSpaces}
          onClear={handleClearClick}
        />
      </div>

      <div className="container my-3">
        <h1>Your Text Summary</h1>
        <p>
          {wordCount} words and {charCount} characters
        </p>
        <p>Estimated read time: {readingTime} minutes</p>
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
    </>
  );
}

