'use server'

import { delay } from "@/util/delay"
import { revalidatePath, revalidateTag } from "next/cache"

export async function createReviewAction(_: any, formData:FormData) {
  const bookId = formData.get('bookId')?.toString()
  const content = formData.get('content')?.toString()
  const author = formData.get('author')?.toString()

  console.log(bookId, content, author, JSON.stringify({bookId, content, author}))

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해 주세요'
    }
  } 

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({bookId, content, author})
      }
    )
    console.log(response.status)
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // // 1. path only
    // revalidatePath(`/book/${bookId}`)
    // // 2. reval. pages under a path
    // revalidatePath('/book/[id]', 'page')
    // // 3. reval. pages with a specific layout
    // revalidatePath('/(with-searchbar)', 'layout')
    // // 4. all data
    // revalidatePath('/', 'layout')
    // 5. tag based revalidate. 
    revalidateTag(`review-${bookId}`)
    return {
      status: true,
      error: ''
    }
  } catch (err) {
    console.error(err)
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다: ${err}`
    }
  }
}