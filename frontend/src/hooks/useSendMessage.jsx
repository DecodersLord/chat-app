import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoadin] = useState(false);

    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoadin(true);

        try {
            const res = await fetch(
                `/api/messages/send/${selectedConversation._id}`,
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ message }),
                }
            );

            const data = await res.json();
            console.log("here ", data);
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadin(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
