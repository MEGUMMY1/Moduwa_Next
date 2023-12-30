import {ReactNode} from "react";
import styles from '@/app/(Logined)/search/_components/thumbnail.module.css';

type Props = { children: ReactNode, modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.layoutContainer}>
      {children}
      {modal}
    </div>
  )
}