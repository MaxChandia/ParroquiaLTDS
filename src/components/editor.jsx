import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const MyEditor = () => {
  // Crea un estado para el editor con un valor inicial vacío
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Función para manejar los cambios en el editor
  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <div>
      <h2>Editor de Draft.js</h2>
      <Editor 
        editorState={editorState}
        onChange={onEditorStateChange} // Actualiza el estado del editor cuando el contenido cambia
      />
    </div>
  );
};

export default MyEditor;

