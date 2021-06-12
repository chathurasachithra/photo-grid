import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Card } from 'semantic-ui-react';

export const TextEditor = props => {
  const [editorState, onEditorStateChange] = useState(
    EditorState.createEmpty()
  );
  return (
    <Card className="w-100">
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'remove',
          ],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
        }}
        onEditorStateChange={state => {
          onEditorStateChange(state);
        }}
      />
      <Button
        basic
        primary
        onClick={() => {
          if (convertToRaw(editorState.getCurrentContent())?.blocks[0]?.text) {
            props.addSection(convertToRaw(editorState.getCurrentContent()));
            onEditorStateChange(EditorState.createEmpty());
          }
        }}
      >
        Add Section
      </Button>
    </Card>
  );
};
