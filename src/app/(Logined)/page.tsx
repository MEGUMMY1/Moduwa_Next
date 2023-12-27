// 예시: src/app/[라우트명]/page.tsx
import React from "react";
import EventBox from "./_components/homeEventBox";
import eventData from "../../../public/data.json";

const Page = () => {
  return (
    <>
      {eventData.map((event) => (
        <EventBox key={event.eventid} event={event} />
      ))}
    </>
  );
};

export default Page;
