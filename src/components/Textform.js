import React, {useEffect, useState} from 'react'

export default function TextForm(props) {
const handleUpClick= ()=>{
    // console.log("Uppercase was clicked" + text);
    let newText= text.toUpperCase();
    setText(newText);
}
const handleOnChange= (event)=>{
    setText(event.target.value);
}
const [text, setText]= useState('Enter text here');
    useEffect(() => {
    if (text.length === 50) {
    alert("Text is too long!");
    }
});

return (
<>
<div className="container">
    <h1>{props.heading}</h1>
<div className="mb-3">
<textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
</div>
<button className="btn btn-primary" onClick={handleUpClick}>Convert to Uppercase</button>
</div>
<div className="container my-3">
    <h1>Your Text summary</h1>
    <p>{text.split(" ").length} words and {text.length}</p>
    </div>
</>
)
}
