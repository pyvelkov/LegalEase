import { useParams } from "react-router-dom";
const DocFillTemplate = () => {
    const { UUID } = useParams();
    return <div>hi {UUID}</div>;
};

export default DocFillTemplate;
