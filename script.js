let deferredPrompt;
const installButton = document.getElementById('installButton');

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.style.display = 'block';
});

// Add click event to the install button
installButton.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    }
});

// Check if the app is already installed
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    installButton.style.display = 'none';
});