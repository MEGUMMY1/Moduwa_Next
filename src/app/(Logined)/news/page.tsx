import React from "react";

import FeedElement from "./_components/feedElement";
import feedData from "../../../../public/feeddata.json"
import FeedTop from "./_components/feedTop";

const Page = () => {
  return (
    <>
      <FeedTop />
      {feedData.map((feed) => (
        <FeedElement key={feed.id} feed={feed} />
      ))}
    </>
  );
};

export default Page;