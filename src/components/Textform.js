import React, { useEffect, useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('Enter text here');

  // Convert to Uppercase
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  // Convert to Lowercase
  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  // Copy text to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Remove Extra Spaces
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/).join(" "); // regex replaces multiple spaces with one
    setText(newText.trim());
  };

  //  Handle user typing
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  //  Optional alert when too long
  useEffect(() => {
    if (text.length >= 50) {
      console.log('Text is too long!');
    }
  }, [text]);

  //  Word count
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

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

        {/* ---All buttons --- */}
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-secondary mx-1" onClick={handleLowClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-success mx-1" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-danger mx-1" onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>
      </div>

      {/* ---Summary Section --- */}
      <div className="container my-3">
        <h1>Your Text Summary</h1>
        <p>{wordCount} words and {text.length} characters</p>
      </div>
    </>
  );
}
