import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache'}
  )
  if (!response.ok) {
    return <footer>제작 @junechol</footer>
  }

  const books:BookData[] = await response.json()
  const bookCount = books.length

  return (
    <footer>
      <div>제작 @junechol</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다</div>
    </footer>
  )

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          {/* <Footer/> */}
          <footer>제작 @junechol</footer>
        </div>
      </body>
    </html>
  );
}
