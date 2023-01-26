import {IS_APPLE} from "../../utils/environment";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useState} from "react";
import {FORMAT_TEXT_COMMAND, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND} from "lexical";

export function ToolbarPlugin({}) {
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState(editor);

    return (
        <div>
            {/* Undo */}
            <button
                onClick={() => {
                    activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
                type="button"
                className=""
                aria-label="Undo">
                ⎌
            </button>

            {/* Next */}
            <button
                onClick={() => {
                    activeEditor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                title={IS_APPLE ? 'Redo (⌘Y)' : 'Redo (Ctrl+Y)'}
                type="button"
                className="toolbar-item"
                aria-label="Redo">
                ⎘
            </button>

            {/* Bold */}
            <button
                onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                }}
                title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
                type="button"
                aria-label={`Format text as bold. Shortcut: ${
                    IS_APPLE ? '⌘B' : 'Ctrl+B'
                }`}>
                𝐁
            </button>

        </div>
    )
}
