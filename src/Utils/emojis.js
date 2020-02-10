import { EditorState, Modifier } from "draft-js";

export default function insertCharacter(characterToInsert, editorState) {
  const currentContent = editorState.getCurrentContent(),
    currentSelection = editorState.getSelection();

  const newContent = Modifier.replaceText(
    currentContent,
    currentSelection,
    characterToInsert
  );

  const newEditorState = EditorState.push(
    editorState,
    newContent,
    "insert-characters"
  );

  return newEditorState;
}
