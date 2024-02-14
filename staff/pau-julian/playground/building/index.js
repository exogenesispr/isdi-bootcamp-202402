const windowLighten = document.querySelectorAll('window-light')

function applyLightOffAnimation() {
    const numberWindowsToAnimate = Math.floor(Math.random() * windowLighten.length);

    const selectedIndices = [];

    while (selectedIndices.length < numberWindowsToAnimate) {
        const randomIndex = Math.floor(Math.random() * windowLighten.length);
        if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
            windowLighten[randomIndex].classList.add('lightOff');

        }
    }


    setTimeout(resetWindows, 10);
}

function resetWindows() {
    windowLighten.forEach(window => {
        window - applyLightOffAnimation.classList.remove('lightOff');
    });
}

applyLightOffAnimation()