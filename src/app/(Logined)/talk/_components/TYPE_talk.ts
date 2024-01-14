export interface ChatRoom {
    id: number;
    name: string | null;
    hashtags: string[];
    info: string | null;
    password: string | null;
    isPrivate: boolean;
    capacity: number;
    genderRestriction: string | null;
    minAge: number;
    maxAge: number;
    participants: User[];
    messages: Message[]; 
}
  
export interface User {
    id: number;
    kakaoId: string | null;
    createdAt: Date; 
    updatedAt: Date; 
    profileImage: string | null;
    name: string | null;
    ageRange: string | null;
    gender: string | null;
    role: string;
    messages: Message[];
    chatRooms: ChatRoom[];
}

export interface Message {
    id: number;
    createdAt: Date; 
    content: string | null;
    senderId: number;
    chatRoomId: number;
    chatRoom: ChatRoom;
    sender: User;
}

export interface Payment {

}

export interface Store {

}