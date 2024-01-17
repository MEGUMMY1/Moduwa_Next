export interface MenuType {
  name: string;
  imageUrl: string | null;
  price: number;
}

export interface MenuItemType {
  menu: MenuType;
  discountPrice: number | null; // Allow discountPrice to be null
}

export interface StoreType {
  name: string;
  location: string;
  imageUrl: string | null;
  storeId: string;
}
export interface PostType {
  id: number;
  store: StoreType;
  menuItems: MenuItemType[];
  description: string | null;
  eventDate: Date;
  deadline: Date;
  createdAt: Date;
  minimumAmount: number | null;
  diningAvailable: boolean;
  diningMenus: string[];
  diningTime: string | null;
  diningMaxPeople: number | null;
  seatArrangeExcuse: boolean;
  takeawayAvailable: boolean;
  takeawayMenus: string[];
  takeawayTime: string | null;
  takeawayMaxPeople: number | null;
  paymentCount: number; // Add this field to track the number of payments
}
