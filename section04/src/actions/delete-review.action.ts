'use server'

import { revalidateTag } from "next/cache"

export async function deleteReviewAction(_:any, formData: FormData) {
  const reviewId = formData.get('reviewId')?.toString()
  const bookId = formData.get('bookId')?.toString()

  console.log(`deleting review: ${reviewId}` )
  
  if (!reviewId || !bookId) {
    return {
      status: false,
      error: '리뷰를 찾을 수 없습니다'
    }
  } 

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
        body: JSON.stringify({reviewId})
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
      error: `리뷰 삭제에 실패했습니다: ${err}`
    }
  }
}