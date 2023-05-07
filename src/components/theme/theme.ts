export function findCurrentTheme() {
    return document.querySelector("html")!.attributes.getNamedItem('data-theme')!.nodeValue
}