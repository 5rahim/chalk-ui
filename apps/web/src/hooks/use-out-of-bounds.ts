import React, { useCallback, useState } from "react"
import useEventListener from "./use-event-listener"
import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect"

interface Size {
    width: number
    height: number
}

export function useOutOfBounds<T extends HTMLElement = HTMLDivElement>(): [
    (node: T | null) => void,
    { top: number, bottom: number, left: number, right: number },
    Size,
] {
    // Mutable values like 'ref.current' aren't valid dependencies
    // because mutating them doesn't re-render the component.
    // Instead, we use a state as a ref to be reactive.
    const [ref, setRef] = useState<T | null>(null)
    const [size, setSize] = useState<Size>({
        width: 0,
        height: 0,
    })
    const [outOfBounds, setOutOfBounds] = React.useState({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    })

    const handleSize = useCallback(() => {

        const windowWidth = Math.min(document.documentElement.clientWidth, window.innerWidth)
        const windowHeight = Math.min(document.documentElement.clientHeight, window.innerHeight)

        const rect = ref?.getBoundingClientRect()

        if (rect && ref?.offsetHeight && ref.offsetWidth && ref?.offsetWidth > 0 && ref?.offsetHeight > 0) {
            let directions = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }

            if (rect.top < 0) {
                directions.top = Math.abs(0 - rect.top)
            }

            if (rect.bottom > windowHeight) {
                directions.bottom = Math.abs(windowHeight - rect.bottom)
            }

            if (rect.left < 0) {
                directions.left = Math.abs(0 - rect.left)
            }

            if (rect.right > windowWidth) {
                directions.right = Math.abs(windowWidth - rect.right)
            }

            if (directions.top > 0 || directions.left > 0 || directions.bottom > 0 || directions.right > 0) {
                setOutOfBounds(directions)
            }
            // setOutOfBounds(prev => {
            //     if (prev.top !== directions.top || prev.right !== directions.right || prev.bottom !== directions.bottom || prev.left !== directions.left) {
            //         return directions
            //     }
            //     return prev
            // })
        }

        setSize({
            width: ref?.offsetWidth || 0,
            height: ref?.offsetHeight || 0,
        })

    }, [ref])

    useEventListener("resize", handleSize)
    useEventListener("click", handleSize)

    useIsomorphicLayoutEffect(() => {
        handleSize()
    }, [ref])

    return [setRef, outOfBounds, size]
}
