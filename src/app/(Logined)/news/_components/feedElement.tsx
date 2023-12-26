import React from 'react';
import './FeedElement.css'; // CSS 파일 import

interface Feed {
  postedImage: string;
  storeName: string;
}

interface FeedProps {
  feed: Feed;
}

const FeedElement: React.FC<FeedProps> = ({ feed }) => {
  return (
    <div className="feedElementContainer">
        <div className="topView">
          <div className="feedProfile">
              {/* 프로필 사진, 가게이름, 거리 */}
          </div>

          <div className="feedDetail">
              {/* 팔로워, 구독 여부, 탭 */}
          </div>
        </div>

        <img className="feedPicture" src={feed.postedImage} alt={feed.storeName} />

        <div className="bottomView">
          <div className="likeButton">
              {/* 좋아요 아이콘, 좋아요 개수 */}
          </div>

          <div className="content">
              {/* 날짜, 내용 */}
          </div>
        </div>
    </div>
  );
}

export default FeedElement;
