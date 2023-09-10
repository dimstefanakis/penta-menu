'use client';

import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useTabStore } from "@/app/store/useTabStore";

interface Tag {
  name: string;
  slug: string;
}

function ScrollingMenu({ tags }: { tags: Tag[] }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { currentTabInViewport, setCurrentTabInViewport } = useTabStore()
  console.log(currentTabInViewport, 'asdasd')

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  function onTabClick(tag: Tag) {
    const el = document.getElementById(tag.slug)

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="w-full sticky top-3">
      <Tabs value={currentTabInViewport as string}>
        <TabsList className="grid w-full grid-cols-2 text-black">
          {tags.map((tag: any) => (
            <TabsTrigger className={
              tag.slug === currentTabInViewport ? 'text-red-500' : ''
            } key={tag.slug} value={tag.slug} onClick={() => onTabClick(tag)}>
              {tag.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

export default ScrollingMenu;
