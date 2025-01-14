import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useGetConversation from "../../hooks/useGetConversation";

function SearchInput() {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversation();
    function handleSubmit(e) {
        e.preventDefault();

        if (!search) return;

        if (search.length < 3) {
            return toast.error(
                "Search term must be at least 3 characters long"
            );
        }

        const conversation = conversations.find((c) => {
            return c.fullName.toLowerCase().includes(search.toLowerCase());
        });

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("Conversation not found");
        }
    }
    return (
        <form className="flex items-center gap-2 p-4" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                className="input input-bordered rounded-full"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                type="submit"
                className="btn btn-circle bg-purple-500 text-white text-2xl"
            >
                <IoSearchSharp />
            </button>
        </form>
    );
}

export default SearchInput;
