import React from "react";
import chatRoomsData from "../../../../public/chatRooms.json";  
import "./_components/talk.css";
import Link from 'next/link';

const Page = () => {
  return (
    <>
    <div className="talklist-container">
      <div className="talkroom-div">
        {chatRoomsData.map((room) => (
          <Link href={`/talk/${room.id}`}>
            <div key={room.id} className="talkroom">
              <img src={room.image} className="talkroom-img" width="60px" height="60px"></img>
              <div className="talkroom-data-a">
                <div className="talkroom-data-b">
                  <p className="roomname">{room.name}</p>
                  <p className="roomcapa">{room.current}/{room.capacity}</p>
                </div>
                <p className="roominfo">{room.info}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default Page;