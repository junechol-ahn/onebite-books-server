import Link from "next/link";
import React, { ReactNode } from "react";

export default function Layout(
  {children, sidebar, feed}: 
  {children: ReactNode, sidebar:ReactNode, feed: ReactNode}
) {
  return (
    <>
    <div>
      <Link href={'/parallel'}>parallel</Link>
      &nbsp;
      &nbsp;
      &nbsp;
      <Link href={'/parallel/setting'}>parallel/setting</Link>
    </div>
    <br></br>
    <div>{sidebar}</div>
    <div>{feed} </div>
    <div>{children}</div>
    </>
  )
}