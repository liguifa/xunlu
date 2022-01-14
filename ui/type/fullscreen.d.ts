declare module 'fullscreen' {
    const fullscreen: (el: Element) => {
        request: () => void,
        release: () => void
    }

    export default fullscreen
}