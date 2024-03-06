import { Readable } from "stream"

export const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}