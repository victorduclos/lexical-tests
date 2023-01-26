import {$getRoot, $getSelection, EditorState, LexicalEditor, LexicalNode} from 'lexical';
import {useEffect} from 'react';

import {InitialConfigType, LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {ToolbarPlugin} from "./components/ToolbarPlugin";
import {RichTextPlugin} from "./components/RichTextPlugin";

const theme = {}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState, editor: LexicalEditor) {
    editorState.read(() => {
        // Read the contents of the EditorState here.
        const root = $getRoot();
        const selection = $getSelection();

        console.log('map', editorState.toJSON());

        console.log('Selection', selection)
    });
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error, editor: LexicalEditor) {
    console.error(error);
}

export function Editor() {
    const initialConfig: InitialConfigType = {
        namespace: 'MyEditor',
        theme,
        onError: onError,
        editorState: (editor) => {

            const state = editor.parseEditorState({
                "root": {
                    "children": [
                        {
                            "children": [
                                {
                                    "detail": 0,
                                    "format": 0,
                                    "mode": "normal",
                                    "style": "",
                                    "text": "Ceci est ",
                                    "type": "text",
                                    "version": 1
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "paragraph",
                            "version": 1
                        },
                        {
                            "children": [],
                            "direction": null,
                            "format": "",
                            "indent": 0,
                            "type": "paragraph",
                            "version": 1
                        },
                        {
                            "children": [
                                {
                                    "detail": 0,
                                    "format": 0,
                                    "mode": "normal",
                                    "style": "",
                                    "text": "du ",
                                    "type": "text",
                                    "version": 1
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "paragraph",
                            "version": 1
                        },
                        {
                            "children": [],
                            "direction": null,
                            "format": "",
                            "indent": 0,
                            "type": "paragraph",
                            "version": 1
                        },
                        {
                            "children": [
                                {
                                    "detail": 0,
                                    "format": 1,
                                    "mode": "normal",
                                    "style": "",
                                    "text": "text avec gras",
                                    "type": "text",
                                    "version": 1
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "paragraph",
                            "version": 1
                        }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "type": "root",
                    "version": 1
                }
            } as any)

            editor.setEditorState(state)
            return;
        }
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin/>

            <OnChangePlugin onChange={onChange}/>
            <HistoryPlugin/>
            <MyCustomAutoFocusPlugin/>
            <RichTextPlugin
                contentEditable={<ContentEditable/>}
                placeholder={<div>Enter some text...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />

        </LexicalComposer>
    );
}
