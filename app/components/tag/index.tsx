'use client';

import { useEffect, useState, useRef } from "react";
import { useTabStore } from "@/app/store/useTabStore";

function Tag({ name, slug }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const { currentTabInViewport, setCurrentTabInViewport } = useTabStore()

  useEffect(() => {
    if (ref.current) {
      const handleScroll = () => {
        const el = ref.current;
        if (el) {
          const { top, bottom, height } = el.getBoundingClientRect();
          const visibleHeight = Math.min(window.innerHeight, bottom) - Math.max(top, 0);
          const sixtyPercentOfElement = 0.6 * height;

          // Check if the element's height is smaller than 60% of the viewport height 
          // and the entire element is visible in the viewport.
          const isSmallElementFullyInView = height < 0.6 * window.innerHeight && top >= 0 && bottom <= window.innerHeight;

          if (visibleHeight >= sixtyPercentOfElement || isSmallElementFullyInView) {
            setCurrentTabInViewport(slug);
          }
        }
      }

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      }
    }
  }, [ref.current]);

  return (
    <div className="w-full" id={slug} ref={ref}>
      <p className="w-full text-4xl font-bold my-20">
        {name}
      </p>
    </div>
  )
}

export default Tag;
