let currentPageIndex = 0;

const viewport = document.getElementById('story-viewport');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');
const chapterLabel = document.getElementById('chapter-label');
const restartBtn = document.getElementById('restart-btn');

function renderPage(index) {
    const pageData = storyPages[index];
    const percent = Math.round(((index + 1) / storyPages.length) * 100);

    let interactiveHtml = '';
    if (pageData.interactive) {
        interactiveHtml = `
            <div class="interactive-box" tabindex="0" role="button">
                ✨ <strong>یه راز کوچیک اینجاست</strong>
                <div class="secret-text hidden">${pageData.secretMessage}</div>
            </div>
        `;
    }

    viewport.innerHTML = `
        <article class="story-page fade-in">
            <div class="scene-wrap">
                <img src="${pageData.image}" alt="${pageData.title}">
                <div class="scene-badge">${pageData.chapter}</div>
            </div>
            <div class="story-copy">
                <div class="eyebrow">PAGE ${String(index + 1).padStart(2, '0')}</div>
                <h2>${pageData.title}</h2>
                <p>${pageData.text}</p>
                <div class="dialogue-box">${pageData.dialogue.replace(' | ', '<br>')}</div>
                ${interactiveHtml}
            </div>
        </article>
    `;

    const box = viewport.querySelector('.interactive-box');
    if (box) {
        const secret = box.querySelector('.secret-text');
        const toggle = () => secret.classList.toggle('hidden');
        box.addEventListener('click', toggle);
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    }

    pageIndicator.textContent = `صفحه ${index + 1} از ${storyPages.length}`;
    chapterLabel.textContent = pageData.chapter;
    progressPercent.textContent = `${percent}٪`;
    progressBar.style.width = `${percent}%`;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === storyPages.length - 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

nextBtn.addEventListener('click', () => {
    if (currentPageIndex < storyPages.length - 1) {
        currentPageIndex++;
        renderPage(currentPageIndex);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        renderPage(currentPageIndex);
    }
});

restartBtn.addEventListener('click', () => {
    currentPageIndex = 0;
    renderPage(currentPageIndex);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') nextBtn.click();
    if (e.key === 'ArrowRight') prevBtn.click();
});

renderPage(currentPageIndex);
