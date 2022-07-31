function changeTheme() {
    // Define where CSS variables were declared
    let root = document.querySelector(':root')
    // Remember variables value
    let primary = getComputedStyle(root).getPropertyValue('--primary')
    let secondary = getComputedStyle(root).getPropertyValue('--secondary')
    let font = getComputedStyle(root).getPropertyValue('--font')
    // Change value according to current value (switch light to dark)
    primary === ' #141414' ? root.style.setProperty('--primary', ' #f1f6f9') : root.style.setProperty('--primary', ' #141414')
    secondary === ' #404040' ? root.style.setProperty('--secondary', ' #b1b3b9') : root.style.setProperty('--secondary', ' #404040')
    font === ' #dddfe2' ? root.style.setProperty('--font', ' #565c66') : root.style.setProperty('--font', ' #dddfe2')
}

export default changeTheme