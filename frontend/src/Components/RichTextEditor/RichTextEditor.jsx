import { useEffect, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
// import * as mammoth from "mammoth";
// import * as mammoth from "mammoth-plus";
import mammothPlus from "mammoth-plus";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fillDownloadTemplate } from "../../util/API/fetchApi";

const RichTextEditor = () => {
    const token = useSelector((state) => state.user.token);
    const { UUID } = useParams();
    const [documentHTML, setDocumentHTML] = useState("");
    // Initialize TipTap editor with initial empty content
    const editor = useEditor({
        extensions: [StarterKit],
        content: documentHTML,
        // parseOptions: { preserveWhitespace: "full" },
    });

    useEffect(() => {
        const fetchDocument = async () => {
            let prepareData = [
                {
                    fieldName: "todayDate",
                    fieldType: "date",
                    fieldValue: "",
                    fieldOptions: "",
                },
            ];
            const dataToSend = new FormData();
            dataToSend.append("fileName", `test.docx`);
            dataToSend.append("fields", JSON.stringify(prepareData));
            try {
                const response = await fillDownloadTemplate(
                    UUID,
                    dataToSend,
                    token
                );
                const blob = new Blob([await response.blob()]);

                const arrayBuffer = await blob.arrayBuffer();
                mammothPlus
                    .convertToHtml({
                        arrayBuffer: arrayBuffer, // in browser
                    })
                    .then(function (result) {
                        var html = result.value; // The generated HTML
                        // console.log(html);
                        setDocumentHTML(html);
                        editor.commands.setContent(html);
                        var messages = result.messages; // Any messages, such as warnings during conversion
                        console.log("messages: ", messages);
                        document.getElementById("htmlInject").innerHTML = html;
                    })
                    .done();
                // const { value: html } = await mammoth.convertToHtml(
                //     {
                //         arrayBuffer,
                //     },
                //     {
                //         // styleMap: [
                //         //     "p[style-name='Heading 1'] => h1:fresh",
                //         //     "p[style-name='Heading 2'] => h2:fresh",
                //         //     "b => strong",
                //         //     "i => em",
                //         //     "u => u",
                //         //     "strike => strike",
                //         //     "p[style-name='Normal'] => p:fresh",
                //         //     "p[style-name='List Paragraph'] => ul > li:fresh",
                //         //     "r[style-name='Highlight'] => mark.highlight",
                //         //     "p[style-name='Body Text'] => p.body-text",
                //         //     "p[style-name='Indented Text'] => p.indented-text",
                //         //     "p[style-name='RightAligned'] => p.right-aligned",
                //         // ],
                //     }
                // );
                // console.log(html);

                // setDocumentHTML(html);
                // editor.commands.setContent(html);
                // document.getElementById("htmlInject").innerHTML = html;
            } catch (err) {
                console.log(err);
            }
        };
        fetchDocument();
    }, [editor]);

    useEffect(() => {
        // console.log(documentHTML);
    }, [documentHTML]);

    return (
        <>
            <div id="htmlInject"></div>
            {/* <EditorContent editor={editor} />
            <style>
                {`
                .right-aligned {
                    text-align: right;
                }
                `}
            </style> */}
        </>
    );
};

export default RichTextEditor;
