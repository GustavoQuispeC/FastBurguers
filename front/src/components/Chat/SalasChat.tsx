import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Chat from "./Chat";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

const adminSocket: Socket = io(`${apiURL}/admin`);

const SalasChat: React.FC = () => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  useEffect(() => {
    adminSocket.on("new_room", (room: string) => {
      console.log(`New room received: ${room}`);
      setRooms((prevRooms) => {
        if (room && !prevRooms.includes(room)) {
          return [...prevRooms, room];
        }
        return prevRooms;
      });
    });

    return () => {
      adminSocket.off("new_room");
    };
  }, []);

  const joinRoom = (room: string) => {
    if (room && room.trim() !== "") {
      adminSocket.emit("join", room);
      setCurrentRoom(room);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-gray-900 rounded-lg">
        <div className="flex-1 flex items-center space-x-2">
          <h5>
            <span className="text-orange-400">Salas</span>
          </h5>
        </div>
      </div>
      <ul className="space-y-2 mt-2">
        {rooms.map((room) => (
          <li key={room}>
            <button
              className="w-full py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => joinRoom(room)}
            >
              {room}
            </button>
          </li>
        ))}
      </ul>
      {currentRoom && <Chat room={currentRoom} />}
    </>
  );
};

export default SalasChat;
