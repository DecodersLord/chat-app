import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoadin] = useState(false);

    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoadin(true);

            try {
                const res = await fetch(
                    `/api/messages/receive/${selectedConversation._id}`
                );
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                toast.error(error);
            } finally {
                setLoadin(false);
            }
        };
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { loading, messages };
};

export default useGetMessages;
