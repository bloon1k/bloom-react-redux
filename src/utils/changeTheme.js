function changeTheme() {
    // Define where CSS variables were declared
    let root = document.querySelector(':root')
    // Remember variables value
    let primary = getComputedStyle(root).getPropertyValue('--primary')
    let secondary = getComputedStyle(root).getPropertyValue('--secondary')
    let font = getComputedStyle(root).getPropertyValue('--font')
    // Change value according to current value (switch light to dark)
    primary === ' #141414' ? root.style.setProperty('--primary', ' #F1F6F9') : root.style.setProperty('--primary', ' #141414')
    secondary === ' #404040' ? root.style.setProperty('--secondary', ' #B1B3B9') : root.style.setProperty('--secondary', ' #404040')
    font === ' #DDDFE2' ? root.style.setProperty('--font', ' #565C66') : root.style.setProperty('--font', ' #DDDFE2')
}

export default changeTheme