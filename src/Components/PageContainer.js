import React from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import insertCharacter from "../Utils/emojis";
const highlightPlugin = createHighlightPlugin();

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.plugins = [highlightPlugin];
    this.onChange = this.onChange.bind(this);
  }

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onHighlight = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT")
    );
  };

  onEmojiClick = e => {
    let emoji = e.currentTarget.getAttribute("data-emoji");
    this.onChange(insertCharacter(emoji, this.state.editorState));
  };

  render() {
    return (
      <div className="editorContainer">
        <button className="underline" onClick={this.onUnderlineClick}>
          U
        </button>
        <button className="bold" onClick={this.onBoldClick}>
          <b>B</b>
        </button>
        <button className="italic" onClick={this.onItalicClick}>
          <em>I</em>
        </button>
        <button className="highlight" onClick={this.onHighlight}>
          <span style={{ padding: "0.3em" }}>H</span>
        </button>
        <div className="emoji-picker">
          <h2 className="toolbar-title">Insert Emoji:</h2>
          <button
            className="emoji"
            onMouseDown={e => e.preventDefault()}
            onClick={this.onEmojiClick}
            data-emoji="🎊"
          >
            <span role="img" aria-label="confetti">
              🎊
            </span>
          </button>
          <button
            className="emoji"
            onMouseDown={e => e.preventDefault()}
            onClick={this.onEmojiClick}
            data-emoji="💖"
          >
            <span role="img" aria-label="sparkle heart">
              💖
            </span>
          </button>
          <button
            className="emoji"
            onMouseDown={e => e.preventDefault()}
            onClick={this.onEmojiClick}
            data-emoji="🌼"
          >
            <span role="img" aria-label="yellow flower">
              🌼
            </span>
          </button>
        </div>
        <div className="editors">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            plugins={this.plugins}
          />
        </div>
      </div>
    );
  }
}

export default PageContainer;
