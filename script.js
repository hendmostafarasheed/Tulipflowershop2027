const shareButton = document.getElementById('shareButton');
const offersButton = document.getElementById('offersButton');
const offersPanel = document.getElementById('offersPanel');
const closeOffers = document.getElementById('closeOffers');
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { toast.textContent = ''; }, 2800);
}

shareButton.addEventListener('click', async () => {
  const shareData = {
    title: 'Tulip Flower Shop Invitation',
    text: 'Discover Tulip Flower Shop — rare flowers for special moments.',
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareData.url);
      showToast('Invitation link copied. Share it with your friends!');
    } else {
      const temp = document.createElement('textarea');
      temp.value = shareData.url;
      document.body.appendChild(temp);
      temp.select();
      const copied = document.execCommand('copy');
      temp.remove();
      showToast(copied ? 'Invitation link copied!' : 'Copy this page link from your browser address bar.');
    }
  } catch (error) {
    if (error && error.name !== 'AbortError') showToast('Use your browser menu to share this invitation.');
  }
});

offersButton.addEventListener('click', () => {
  offersPanel.hidden = false;
});
closeOffers.addEventListener('click', () => {
  offersPanel.hidden = true;
});
