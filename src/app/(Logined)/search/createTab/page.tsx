//app/search/createTab/page

"use client";
import React, { ChangeEventHandler, useState } from "react";
import styles from "./_components/page.module.css";
import prisma from "@/app/lib/prisma";
import { useRouter } from "next/navigation";

const CreateTab = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [boxHeight, setBoxHeight] = useState("0px");

    const [isUsingPass, setIsUsingPass] = useState(false);
    const [passBoxHeight, setPassBoxHeight] = useState("0px");

    const [name, setName] = useState('');
    const [password, setPassWord] = useState('');
    const [info, setInfo] = useState('');
    const [hashtagInput, setHashtagInput] = useState(''); // 현재 입력 중인 해시태그
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [checkPublic, setCheckPublic] = useState(true);
    const [checkPrivate, setCheckPrivate] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [capacity, setCapacity] = useState(10);
    const [genderRestriction, setGenderRestriction] = useState('');
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(0);
    
    const router = useRouter();

    const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value);
    }

    const handlePassWordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassWord(e.target.value);
    }

    const handleinfoChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInfo(e.target.value);
    }

    const handleHashtagInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setHashtagInput(e.target.value);
    };
    
    const addHashtag = () => {
        if (hashtagInput && !hashtags.includes(hashtagInput)) {
            setHashtags([...hashtags, hashtagInput]);
            setHashtagInput(''); // 입력 필드 초기화
        }
    };

    const handlePublicChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCheckPublic(e.target.value === 'public');
        setCheckPrivate(e.target.value !== 'public');
        if(e.target.value === 'public') {
            setIsPrivate(checkPublic);
        }else {
            setIsPrivate(checkPrivate);
        }
    }

    const handleIncreaseCapacity = () => {
        setCapacity(prev => prev + 1);
    }    
    const handleDecreaseCapacity = () => {
        setCapacity(prev => (prev > 0 ? prev - 1 : 0));
    }

    const toggleExpansion = () => {
        setBoxHeight(isExpanded ? "0px" : "90px");
        setIsExpanded(!isExpanded);
    }

    const togglePassBoxExpansion = () => {
        setPassBoxHeight(isUsingPass ? "0px" : "50px");
        setIsUsingPass(!isUsingPass);
    }

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
          const body = { name, password, info, hashtags, isPrivate, minAge, maxAge, capacity }
          await fetch(`/api/room`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
    
          router.push('/search')
        } catch (error) {
          console.error(error)
        }
    }

    return (
        <div className={styles.Container}>
            <div className={styles.TopBar}>
                <p>채팅방 만들기</p>
                
                <div className={styles.registerButton}>
                    <form onSubmit={submitData}>
                        <input
                            type="submit"
                            value="Create"
                        />
                        <a className={styles.back} href="/">
                            or Cancel
                        </a>
                    </form>
                </div>
            </div>
            
            <div className={styles.contentContainer}>
                <div className={styles.imageContainer}>
                    <img src="/하사웨이.png" alt="Background" />
                    <button className={styles.imageSettingButton}>이미지 설정</button>
                </div>

                <div className={styles.nameInputBox}>
                    <input type="text" value={name} onChange={handleNameChange} placeholder="이름 입력"/>
                </div>

                <div className={styles.passwordInputBox}>
                    <div className={styles.passwordTextBox}>
                        <span>비밀번호 설정</span>
                        <input type="checkbox" value="isUsingPass" onChange={togglePassBoxExpansion} checked={isUsingPass} />                   
                    </div>
                    <div className={styles.animebox} style={{ height: passBoxHeight }}>
                        <div className={styles.passwordElement}>
                            <input type="text" value={password} onChange={handlePassWordChange} placeholder="비밀번호 입력"/>
                        </div>
                    </div>
                </div>

                <div className={styles.infoInputBox}>
                    <input type="text" value={info} onChange={handleinfoChange} placeholder="채팅방 소개 입력"/>
                </div>

                <div className={styles.hashtagInputBox}>
                    <input 
                        type="text" 
                        value={hashtagInput} 
                        onChange={handleHashtagInputChange} 
                        placeholder="해시태그 입력" 
                    />
                    <span onClick={addHashtag}>+</span>
                </div>

                <div className={styles.hashtagsList}>
                    {hashtags.map((tag, index) => (
                        <span key={index} className={styles.hashtag}>
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className={styles.privateBlock}>
                    공개, 비공개 여부
                    
                    <div className={styles.privateElement}>
                        <span>공개</span>
                        <input type="radio" name="privacy" value="public" onChange={handlePublicChange} checked={checkPublic} />
                    </div>

                    <div className={styles.privateElement}>
                        <span>비공개</span>
                        <input type="radio" name="privacy" value="private" onChange={handlePublicChange} checked={checkPrivate} />
                    </div>
                </div>

                <div className={styles.capacityBlock}>
                    <p>최대 수용 인원 설정</p>

                    <div className={styles.capacityElement}>
                        <span onClick={handleDecreaseCapacity}>-</span>
                        <span>{capacity}</span>
                        <span onClick={handleIncreaseCapacity}>+</span>
                    </div>
                </div>

                <div className={styles.requirementBlock}>
                    <div className={styles.requireTextBox}>
                        <span>조건 설정(성별, 나이)</span>
                        <input type="checkbox" value="isExpanded" onChange={toggleExpansion} checked={isExpanded} />
                    </div>

                    <div className={styles.animebox} style={{ height: boxHeight }}>
                        <div className={styles.requriementControlBlock}>
                            <div className={styles.requireElement}>
                                <span>성별</span>
                                <div className={styles.genderSelectBlock}>
                                    <span className={styles.genderSelectBox}>all</span>
                                    <span className={styles.genderSelectBox}>남성만</span>
                                    <span className={styles.genderSelectBox}>여성만</span>
                                </div>
                            </div>

                            <div className={styles.requireAgeElement}>
                                <div className={styles.requireAgeTextBox}>
                                    <span>나이</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTab;