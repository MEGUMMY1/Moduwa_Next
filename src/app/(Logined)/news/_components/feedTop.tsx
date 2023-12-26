import React from 'react';
import './feedTop.css'; // CSS 파일 import

const FeedTop = () => {
  return (
    <div className="layout">
        <div className="container">
            <div className="dropdownContainer">
                <div className="dropdownButton">구독</div>
                <div className="dropdownContent">
                    <div className="dropdownItem">구독</div>
                    <div className="dropdownItem">주변 뉴스</div>
                </div>
            </div>

            <div className="dropdownContainer">
                <div className="dropdownButton">모두와 사람들</div>
                <div className="dropdownContent">
                    <div className="dropdownItem">모두와 판매자</div>
                    <div className="dropdownItem">모두와 구매자</div>
                    <div className="dropdownItem">핫 리뷰어</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default FeedTop;
