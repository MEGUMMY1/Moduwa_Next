// app\(Logined)\store\certification\page.tsx
"use client";

import React, { useState } from "react";
import styles from "./_components/certification.module.css";
import DaumPostcode from "react-daum-postcode";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

interface AddressData {
    zipCode: string;
    roadAddress: string;
}

const Postcode: React.FC<{ onAddressChange: (addressData: AddressData) => void }> = ({ onAddressChange }) => {
    const [zipCode, setZipcode] = useState<string>("");
    const [roadAddress, setRoadAddress] = useState<string>("");

    const completeHandler = (data: any) => {
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        onAddressChange({ zipCode: data.zonecode, roadAddress: data.roadAddress });
    }

    return (
        <div>
            <DaumPostcode 
                onComplete={completeHandler}
            />
        </div>
    );
}

export default function Page() {
    const router = useRouter();
    const [storeName, setStoreName] = useState<string>("");
    const [storeType, setStoreType] = useState<string>("");
    const [storePhone, setStorePhone] = useState<string>("");
    const [addressData, setAddressData] = useState<AddressData | null>(null);

    const handleAddressChange = (data: AddressData) => {
        setAddressData(data);
    }

    return (
        <>
            <div className={styles.certi_container}>
                <div className={styles.certi_header}>
                    <button onClick={() => router.back()} className={styles.back_button}>
                        <IoArrowBackOutline size={"40px"} color={"grey"} />
                    </button>
                    <p>가게 등록</p>
                </div>
                <div className={styles.certi_imageUpload}>이미지 등록</div>
                <div className={styles.certi_input_div}>
                    <input type="text" placeholder="상호명" className={styles.certi_input} onChange={(e) => setStoreName(e.target.value)} />
                    <input type="text" placeholder="업종" className={styles.certi_input} onChange={(e) => setStoreType(e.target.value)} />
                    <input type="text" placeholder="연락처" className={styles.certi_input} onChange={(e) => setStorePhone(e.target.value)} />
                    {addressData && (
                        <>
                        <input type="text" value={addressData.zipCode} placeholder="우편번호" className={styles.certi_input} readOnly />
                        <input type="text" value={addressData.roadAddress} placeholder="가게주소" className={styles.certi_input} readOnly />
                        </>
                    )}
                    <Postcode onAddressChange={handleAddressChange} />
                    <button type="button" className={styles.certi_btn}>등록하기</button>
                </div>
            </div>
        </>
    );
};