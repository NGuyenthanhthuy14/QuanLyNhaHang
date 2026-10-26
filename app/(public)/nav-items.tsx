'use client'
import { getAccessTokenFromLocalStorage } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'


const menuItems = [
  {
    title: 'Món ăn',
    href: '/menu'
  },
  {
    title: 'Đơn hàng',
    href: '/orders',
    authRequired: true 
  },
  {
    title: 'Đăng nhập',
    href: '/login',
    authRequired: false
  },
  {
    title: 'Quản lý',
    href: '/manage/dashboard',
    authRequired: true
  }
]
// sv sẽ trả về là món an đăng nhập, di sv k bt trang thái đăng nhập.
// đầu tiên client sẽ hiển thị món ăn và đăng nhập. Nhưng ngay sau đó thì client render ra là món ăn , đơn hàng, quản lý do đã check được trạng thái đăng nhập.
export default function NavItems({ className }: { className?: string }) {
  const [isAuth, setIsAuth] =useState(false)

  useEffect(() => {
    setIsAuth(Boolean(getAccessTokenFromLocalStorage()))
  }, [])
  // const isAuth = Boolean(getAccessTokenFromLocalStorage())
  return menuItems.map((item) => {
    if (item.authRequired === true && !isAuth || item.authRequired === false && isAuth) return null
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
