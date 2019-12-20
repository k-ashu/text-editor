import { RichUtils } from "draft-js";

export default () => {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: "#fffe0d"
      }
    },
    handleKeyCommand: (command, editorState, { setEditorState }) => {
      if (command === "highlight") {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
        return true;
      }
    }
  };
};
