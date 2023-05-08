export function findCurrentTheme() {
    return document.querySelector("html")!.attributes.getNamedItem('data-theme')!.nodeValue
}

export const dark = 'dark'
export const light = 'winter'

export const darkPrimaryColor = '#661ae6'
export const darkAccentColor = '#1fb2a5'
export const lightPrimaryColor = '#047aff'
export const lightAccentColor = '#c148ac'