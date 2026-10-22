// سیستم پخش و کنترل موسیقی پس‌زمینه
let isPlaying = false;
const audioBtn = document.getElementById('audio-toggle');

// ساخت آبجکت صدا
const bgMusic = new Audio('assets/music/romantic-bg.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.45;
bgMusic.preload = 'auto';

// بعضی مرورگرها اجازه پخش خودکار نمی‌دن، پس باید با کلیک کاربر شروع بشه
function updateButton() {
    if (!audioBtn) return;
    audioBtn.textContent = isPlaying ? "🔊 قطع موسیقی" : "🎵 موسیقی";
}

if (audioBtn) {
    audioBtn.addEventListener('click', async () => {
        try {
            if (isPlaying) {
                bgMusic.pause();
                isPlaying = false;
            } else {
                // اگر قبلاً خطا خورده بود، دوباره لود کن
                if (bgMusic.error) {
                    bgMusic.load();
                }
                await bgMusic.play();
                isPlaying = true;
            }
            updateButton();
        } catch (err) {
            console.error('خطا در پخش موسیقی:', err);
            isPlaying = false;
            updateButton();
            alert('مرورگر اجازه پخش خودکار نداد. دوباره روی دکمه بزن یا صفحه رو با کلیک فعال کن.');
        }
    });
}

// وقتی آهنگ تموم شد (اگر loop کار نکرد)
bgMusic.addEventListener('ended', () => {
    if (isPlaying) {
        bgMusic.currentTime = 0;
        bgMusic.play().catch(() => {});
    }
});

// اگر کاربر صفحه رو ترک کرد، صدا رو قطع کن (اختیاری)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
        bgMusic.pause();
    } else if (!document.hidden && isPlaying) {
        bgMusic.play().catch(() => {});
    }
});
