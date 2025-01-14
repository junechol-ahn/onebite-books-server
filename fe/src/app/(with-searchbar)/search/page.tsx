import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult(
  {searchParams} : {searchParams: Promise<{q:string}>}
) {
  const {q} = await searchParams
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    {cache: 'force-cache'}
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata(
  {searchParams}: 
  {searchParams:Promise<{q?:string}>}
) {
  const {q} = await searchParams

  return {
    title: `한입 북스 검색 : ${q}`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `한입 북스 검색 : ${q}`,
      description: `${q}의 검색 결과입니다`,
      images: ['/thumbnail.png'],
    }
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
  }>
}) {

  const {q} = await searchParams

  return (
    <Suspense key={q || ""}  fallback={<BookListSkeleton count={2}/>}>
      <SearchResult searchParams={searchParams}/>
    </Suspense>
  );
}
