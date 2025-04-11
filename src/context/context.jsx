import { createContext, useState, useRef, useEffect } from "react";
import { generateContent } from "../config/gemini.cjs";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const timeoutIds = useRef([]);

    const delayPara = (index, nextWord) => {
        const timeoutId = setTimeout(() => {
            setResultData((prevData) => prevData + nextWord + " ");
        }, 75 * index);
    };


    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }
    const onSent = async () => {
        try {
            setLoading(true);
            setShowResult(true);

            const response = await generateContent(input);
            setRecentPrompt(input);
            setPrevPrompts((prev) => [...prev, input]);

            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let newResponse2 = newResponse.split("*").join("</br>");
            let newResponseArray = newResponse2.split(" ");

            timeoutIds.current.forEach((id) => clearTimeout(id));
            timeoutIds.current = [];

            for (let i = 0; i < newResponseArray.length; i++) {
                delayPara(i, newResponseArray[i]);
            }

        } catch (error) {
            console.error("Error generating content:", error);
            setResultData("An error occurred. Please try again.");
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    useEffect(() => {
        return () => {
            timeoutIds.current.forEach((id) => clearTimeout(id));
        };
    }, []);

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider; 