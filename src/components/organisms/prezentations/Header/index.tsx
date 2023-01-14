import Link from 'next/link'
import { memo } from 'react'

export const Header = memo(function Header() {
  return (
    <header className="flex h-14 min-h-fit items-center justify-between bg-white px-4 shadow-md">
      <h1 className="text-xl font-bold">
        <Link href="/">Todo List</Link>
      </h1>
      <nav>
        <ul className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="relative grid h-8 place-content-center rounded px-2 transition before:absolute before:bottom-0 before:right-0 before:left-0 before:block before:h-0.5 before:scale-x-0 before:rounded-full before:bg-current before:transition [@media(any-hover:hover){&:hover}]:before:scale-x-100"
            >
              Link
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="relative grid h-8 place-content-center rounded px-2 transition before:absolute before:bottom-0 before:right-0 before:left-0 before:block before:h-0.5 before:scale-x-0 before:rounded-full before:bg-current before:transition [@media(any-hover:hover){&:hover}]:before:scale-x-100"
            >
              Link
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="relative grid h-8 place-content-center rounded px-2 transition before:absolute before:bottom-0 before:right-0 before:left-0 before:block before:h-0.5 before:scale-x-0 before:rounded-full before:bg-current before:transition [@media(any-hover:hover){&:hover}]:before:scale-x-100"
            >
              Link
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="relative grid h-8 place-content-center rounded px-2 transition before:absolute before:bottom-0 before:right-0 before:left-0 before:block before:h-0.5 before:scale-x-0 before:rounded-full before:bg-current before:transition [@media(any-hover:hover){&:hover}]:before:scale-x-100"
            >
              Link
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
})
