// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { IoIosSend } from "react-icons/io";
// import { FaComments } from "react-icons/fa";
// import { FcAssistant } from "react-icons/fc";
// import { IoCloseCircle } from "react-icons/io5";
// const apiURL = process.env.NEXT_PUBLIC_API_URL;

// const Chatbot: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
//   const [input, setInput] = useState<string>("");

//   const inputRef = useRef<HTMLInputElement>(null);

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen]);

//   const sendMessage = async () => {
//     if (!input) return;

//     const newMessages = [...messages, { sender: "User", message: input }];
//     setMessages(newMessages);

//     const response = await axios.post(`${apiURL}/chatbot/message`, {
//       userId: "uniqueUserId", // You can generate a unique user ID here
//       message: input,
//     });

//     setMessages([
//       ...newMessages,
//       { sender: "Bot", message: response.data.response },
//     ]);
//     setInput("");
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {!isOpen && (
//         <div
//           className="bg-blue-500 text-white rounded-full p-3 cursor-pointer transition duration-300 transform hover:scale-110"
//           onClick={toggleChatbot}
//         >
//           <FaComments size={38} />
//         </div>
//       )}
//       {isOpen && (
//         <div className="bg-blue-100 rounded-lg shadow-md p-4 w-80">
//           <div className="flex items-center justify-between mb-2 bg-blue-200 px-2 py-1 rounded">
//             <FcAssistant size={40} />
//             <h4 className=" text-md font-semibold text-gray-800">
//               FastBurgers responde:
//             </h4>
//             <button
//               onClick={toggleChatbot}
//               className="text-gray-600 text-sm hover:text-gray-800"
//             >
//               <IoCloseCircle size={18} className="text-red-700" />
//             </button>
//           </div>
//           <div style={{ maxWidth: "400px", margin: "0 auto" }}>
//             <div
//               style={{
//                 maxHeight: "50vh",
//                 overflowY: "auto",
//                 marginBottom: "10px",
//                 paddingRight: "10px", // to ensure space for the scrollbar
//               }}
//               className="chat-messages-container"
//             >
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     marginBottom: "5px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent:
//                       msg.sender === "User" ? "flex-end" : "flex-start",
//                   }}
//                 >
//                   <div
//                     style={{
//                       backgroundColor:
//                         msg.sender === "User" ? "#DCF8C6" : "#E5E5EA",
//                       padding: "10px",
//                       borderRadius: "20px",
//                       maxWidth: "70%",
//                       boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//                     }}
//                   >
//                     <p style={{ margin: 0 }}>{msg.message}</p>
//                   </div>
//                   {msg.sender !== "User" && (
//                     <span style={{ marginLeft: "5px" }}>
//                       {msg.sender === "User" ? "👤" : "🤖"}
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//                 ref={inputRef}
//                 style={{
//                   width: "calc(100% - 70px)",
//                   marginRight: "10px",
//                   padding: "10px",
//                   borderRadius: "10px",
//                   border: "none",
//                   boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//                 }}
//                 className="bg-white rounded text-black pr-2"
//               />
//               <button
//                 onClick={sendMessage}
//                 className=" text-orange-500"
//                 style={{ marginLeft: "5px" }}
//               >
//                 <IoIosSend size={40} />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import { FaComments } from "react-icons/fa";
import { FcAssistant } from "react-icons/fc";
import { IoCloseCircle } from "react-icons/io5";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [input, setInput] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { sender: "User", message: input }];
    setMessages(newMessages);

    const response = await axios.post(`${apiURL}/chatbot/message`, {
      userId: "uniqueUserId", // You can generate a unique user ID here
      message: input,
    });

    setMessages([
      ...newMessages,
      { sender: "Bot", message: response.data.response },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <div
          className="bg-blue-500 text-white rounded-full p-3 cursor-pointer transition duration-300 transform hover:scale-110"
          onClick={toggleChatbot}
        >
          <FaComments size={38} />
        </div>
      )}
      {isOpen && (
        <div className="bg-blue-100 rounded-lg shadow-md p-4 w-80">
          <div className="flex items-center justify-between mb-2 bg-blue-200 px-2 py-1 rounded">
            <FcAssistant size={40} />
            <h4 className="text-md font-semibold text-gray-800">
              FastBurgers responde:
            </h4>
            <button
              onClick={toggleChatbot}
              className="text-gray-600 text-sm hover:text-gray-800"
            >
              <IoCloseCircle size={18} className="text-red-700" />
            </button>
          </div>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <div
              style={{
                maxHeight: "50vh",
                overflowY: "auto",
                marginBottom: "10px",
                paddingRight: "10px", // to ensure space for the scrollbar
              }}
              className="chat-messages-container"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      msg.sender === "User" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      backgroundColor:
                        msg.sender === "User" ? "#DCF8C6" : "#E5E5EA",
                      padding: "10px",
                      borderRadius: "20px",
                      maxWidth: "70%",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {msg.sender === "User" ? (
                      <p style={{ margin: 0 }}>{msg.message}</p>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: msg.message }}
                      />
                    )}
                  </div>
                  {msg.sender !== "User" && (
                    <span style={{ marginLeft: "5px" }}>
                      {msg.sender === "User" ? "👤" : "🤖"}
                    </span>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                ref={inputRef}
                style={{
                  width: "calc(100% - 70px)",
                  marginRight: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white rounded text-black pr-2"
              />
              <button
                onClick={sendMessage}
                className="text-orange-500"
                style={{ marginLeft: "5px" }}
              >
                <IoIosSend size={40} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

