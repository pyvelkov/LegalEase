import { useEffect, useState } from "react";
import mammothPlus from "mammoth-plus";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpecificTemplateFile } from "../../util/API/fetchApi";

const RichTextEditor = () => {
    const token = useSelector((state) => state.user.token);
    const { UUID } = useParams();
    const [documentHTML, setDocumentHTML] = useState("");

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await getSpecificTemplateFile(UUID, token);
                const blob = new Blob([await response.blob()]);

                const arrayBuffer = await blob.arrayBuffer();
                mammothPlus
                    .convertToHtml({
                        arrayBuffer: arrayBuffer,
                    })
                    .then(function (result) {
                        var html = result.value; // The generated HTML
                        setDocumentHTML(html);

                        // console log any messages/warnings on conversion (will leave it for debugging when implementing full RTE later)
                        // var messages = result.messages;
                        // console.log("messages: ", messages);
                        document.getElementById(
                            "livePreviewElement"
                        ).innerHTML = html;
                    })
                    .done();
            } catch (err) {
                console.log(err);
            }
        };
        fetchDocument();
    }, [documentHTML]);

    return (
        <>
            <div id="livePreviewElement"></div>
        </>
    );
};

export default RichTextEditor;
