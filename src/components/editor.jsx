import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <div>
      <h2>Editor de Draft.js</h2>
      <Editor 
        editorState={editorState}
        onChange={onEditorStateChange}
      />
    </div>
  );
};

export default MyEditor;

