import Conversation from "./Conversation";
import useGetconversations from "../../hooks/useGetConversations.js";
import { getRandomEmoji } from "../../utils/emojis.js";


const Conversations = () => {
  const { loading, conversations } = useGetconversations();
 
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation = {conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? 
        <span className="loading loading-spinner mx-auto"></span>
       : null}
    </div>
  );
};
// return (
//     <div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
//   )

export default Conversations;
