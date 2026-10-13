// 1. Check the URL on load and open the matching tab
const hash = window.location.hash;
if (hash) {
    const tabId = 'tab-' + hash.substring(1); 
    const activeRadio = document.getElementById(tabId);
    if (activeRadio) activeRadio.checked = true;
}

// 2. Update the URL silently when you click a navigation button
document.querySelectorAll('nav label').forEach(label => {
    label.addEventListener('click', (e) => {
        const newHash = e.target.getAttribute('for').replace('tab-', '');
        history.replaceState(null, null, '#' + newHash);
    });
});