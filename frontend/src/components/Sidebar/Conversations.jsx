import useGetConversations from "../../hooks/useGetConversation";
import Conversation from "../Sidebar/Conversation.jsx";
import { getRandomEmoji } from "../../utils/emojis";

function Conversations() {
    const { loading, conversations } = useGetConversations();

    return (
        <div>
            {conversations.map((conversations, idx) => (
                <Conversation
                    key={conversations._id}
                    conversation={conversations}
                    emoji={getRandomEmoji()}
                    lastIndx={idx === conversations.length - 1}
                />
            ))}
            {loading ? <span className="loading loading-spinner"></span> : null}
        </div>
    );
}

export default Conversations;
