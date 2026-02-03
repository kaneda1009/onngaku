const dateInput = document.getElementById("date");
const titleInput = document.getElementById("title");
const musicTitleInput = document.getElementById("musicTitle");
const youtubeInput = document.getElementById("youtubeUrl");
const diaryInput = document.getElementById("diary");
const addBtn = document.getElementById("addBtn");
const albumList = document.getElementById("albumList");
const errorText = document.getElementById("error");
const emptyMessage = document.getElementById("emptyMessage");

function getYouTubeId(url) {
    if (!url) return null;
    const patterns = [
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtu\.be\/([^?&]+)/,
        /youtube\.com\/embed\/([^?&]+)/
    ];
    for (const p of patterns) {
        const match = url.match(p);
        if (match) return match[1];
    }
    return null;
}

function getThumbnailUrl(id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function updateEmptyMessage() {
    emptyMessage.style.display = albumList.children.length === 0 ? "block" : "none";
}

function createAlbumCard(data) {
    const card = document.createElement("div");
    card.className = "album-card";

    if (data.youtubeId) {
        const thumbWrap = document.createElement("div");
        thumbWrap.className = "thumb-wrapper";

        const img = document.createElement("img");
        img.src = getThumbnailUrl(data.youtubeId);

        thumbWrap.appendChild(img);

        // ★ サムネクリックで YouTube 再生ページへ
        thumbWrap.addEventListener("click", () => {
            window.open(`https://www.youtube.com/watch?v=${data.youtubeId}`, "_blank");
        });

        card.appendChild(thumbWrap);
    }

    const titleEl = document.createElement("div");
    titleEl.className = "album-title";
    titleEl.textContent = data.title || "タイトルなし";

    const dateEl = document.createElement("div");
    dateEl.className = "album-date";
    dateEl.textContent = data.date ? `日付：${data.date}` : "";

    const musicEl = document.createElement("div");
    musicEl.className = "album-music";
    musicEl.textContent = data.musicTitle ? `♪ ${data.musicTitle}` : "";

    const diaryEl = document.createElement("div");
    diaryEl.className = "album-diary";
    diaryEl.textContent = data.diary || "";

    card.appendChild(titleEl);
    card.appendChild(dateEl);
    card.appendChild(musicEl);
    card.appendChild(diaryEl);

    return card;
}

addBtn.addEventListener("click", () => {
    errorText.textContent = "";

    const date = dateInput.value;
    const title = titleInput.value.trim();
    const musicTitle = musicTitleInput.value.trim();
    const youtubeUrl = youtubeInput.value.trim();
    const diary = diaryInput.value.trim();

    if (!title && !musicTitle && !diary) {
        errorText.textContent = "タイトル・音楽・日記のどれか1つは入力してね。";
        return;
    }

    let youtubeId = null;
    if (youtubeUrl) {
        youtubeId = getYouTubeId(youtubeUrl);
        if (!youtubeId) {
            errorText.textContent = "YouTube URLが正しくありません。";
            return;
        }
    }

    const data = { date, title, musicTitle, diary, youtubeId };
    const card = createAlbumCard(data);

    albumList.prepend(card);
    updateEmptyMessage();

    dateInput.value = "";
    titleInput.value = "";
    musicTitleInput.value = "";
    youtubeInput.value = "";
    diaryInput.value = "";
});

updateEmptyMessage();
