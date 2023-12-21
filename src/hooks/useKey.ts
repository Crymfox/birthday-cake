import { useEffect, useRef } from "react"

const useKey = (key: string, fn: (e: KeyboardEvent) => void) => {
    
    const fnRef = useRef(fn)

    useEffect(() => {
        fnRef.current = fn
    })
    
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if (e.code === key) fnRef.current(e)
        }
        addEventListener("keydown", handle)
        return () => removeEventListener("keydown", handle)
    }, [key])
}

export default useKey