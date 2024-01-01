// 예시: src/app/(Logined)/page.tsx

import React from "react";
import EventBox from "./_components/homeEventBox";
import eventData from "../../../public/data.json";
import prisma from "../lib/prisma";
import { sql } from "@vercel/postgres";

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
