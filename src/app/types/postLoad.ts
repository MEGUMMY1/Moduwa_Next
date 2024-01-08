import {
  PostType,
  MenuType,
  MenuItemType,
  StoreType,
} from "../(Logined)/_components/TYPE_post";

export function postLoad(
  postId: number,
  store: StoreType[],
  menu: MenuType[],
  menuItems: MenuItemType[] /* other parameters */
): PostType {
  return {
    id: postId,
    store: store,
    menuItems: menuItems,
    // set other properties
  };
}
