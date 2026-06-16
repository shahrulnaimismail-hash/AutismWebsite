// Data permainan
const fruits = [
    { name: "Epal", emoji: "🍎" }, { name: "Pisang", emoji: "🍌" },
    { name: "Anggur", emoji: "🍇" }, { name: "Strawberi", emoji: "🍓" },
    { name: "Tembikai", emoji: "🍉" }, { name: "Oren", emoji: "🍊" },
    { name: "Mangga", emoji: "🥭" }, { name: "Kiwi", emoji: "🥝" }
];

const colors = [
    { name: "Merah", code: "#E34234" }, { name: "Biru", code: "#3b82f6" },
    { name: "Kuning", code: "#F5D742" }, { name: "Hijau", code: "#4CAF50" },
    { name: "Ungu", code: "#9b59b6" }, { name: "Oren", code: "#FF8C42" },
    { name: "Merah Jambu", code: "#FFB6C1" }, { name: "Coklat", code: "#A0522D" }
];

const shapes = [
    { name: "Hati", emoji: "❤️" }, { name: "Segi tiga", emoji: "🔺" },
    { name: "Bulan", emoji: "🌙" }, { name: "Ketupat", emoji: "🔷" },
    { name: "Bulatan", emoji: "🔴" }, { name: "Segi empat", emoji: "⬛" },
    { name: "Bintang", emoji: "⭐" }, { name: "Permata", emoji: "💎" }
];

// State permainan
let fruitState = { current: null, options: [], score: 0, waitingNext: false };
let colorState = { current: null, options: [], score: 0, waitingNext: false };
let shapeState = { current: null, options: [], score: 0, waitingNext: false };

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// =============== PERMAINAN BUAH ===============
function generateFruitOptions(correctFruit) {
    let others = fruits.filter(f => f.name !== correctFruit.name);
    let shuffledOthers = shuffleArray([...others]);
    let selected = shuffledOthers.slice(0, 3);
    let opts = [{ fruit: correctFruit, isCorrect: true }, ...selected.map(f => ({ fruit: f, isCorrect: false }))];
    return shuffleArray(opts);
}

function loadFruitGame() {
    fruitState.waitingNext = false;
    let randomIdx = Math.floor(Math.random() * fruits.length);
    fruitState.current = fruits[randomIdx];
    fruitState.options = generateFruitOptions(fruitState.current);
    document.getElementById("fruitTargetEmoji").innerText = fruitState.current.emoji;
    document.getElementById("fruitTargetName").innerText = fruitState.current.name;
    renderFruitOptions();
    let fb = document.getElementById("fruitFeedback");
    fb.innerHTML = "🍎 Pilih buah yang sama!";
    fb.style.background = "rgba(250, 243, 232, 0.95)";
}

function renderFruitOptions() {
    let container = document.getElementById("fruitOptions");
    container.innerHTML = "";
    for (let opt of fruitState.options) {
        let card = document.createElement("div");
        card.className = "option-card";
        card.innerHTML = `<div class="option-emoji">${opt.fruit.emoji}</div><div style="font-weight:bold; margin-top:5px;">${opt.fruit.name}</div>`;
        card.onclick = () => handleFruitAnswer(opt.isCorrect, opt.fruit.name);
        container.appendChild(card);
    }
}

function handleFruitAnswer(correct, selectedName) {
    if (fruitState.waitingNext) {
        document.getElementById("fruitFeedback").innerHTML = "✅ Tekan 'Soalan seterusnya' untuk terus belajar!";
        return;
    }
    let fb = document.getElementById("fruitFeedback");
    if (correct) {
        fruitState.score++;
        document.getElementById("fruitScore").innerHTML = `⭐ ${fruitState.score}`;
        fb.innerHTML = `🎉 BETUL! ${selectedName} sama dengan ${fruitState.current.name}! Bagus! 🎉`;
        fb.style.background = "#cbe6b5";
        fruitState.waitingNext = true;
    } else {
        fb.innerHTML = `❌ Cuba lagi. ${selectedName} bukan ${fruitState.current.name}. Pilih buah yang sama.`;
        fb.style.background = "#ffe0cc";
    }
}

// =============== PERMAINAN WARNA ===============
function generateColorOptions(correctColor) {
    let others = colors.filter(c => c.name !== correctColor.name);
    let selected = shuffleArray([...others]).slice(0, 3);
    let opts = [{ color: correctColor, isCorrect: true }, ...selected.map(c => ({ color: c, isCorrect: false }))];
    return shuffleArray(opts);
}

function loadColorGame() {
    colorState.waitingNext = false;
    let rand = Math.floor(Math.random() * colors.length);
    colorState.current = colors[rand];
    colorState.options = generateColorOptions(colorState.current);
    document.getElementById("colorSample").style.backgroundColor = colorState.current.code;
    renderColorOptions();
    let fb = document.getElementById("colorFeedback");
    fb.innerHTML = "🎨 Klik warna yang sama!";
    fb.style.background = "rgba(250, 243, 232, 0.95)";
}

function renderColorOptions() {
    let container = document.getElementById("colorOptions");
    container.innerHTML = "";
    for (let opt of colorState.options) {
        let btn = document.createElement("div");
        btn.className = "color-option";
        btn.style.backgroundColor = opt.color.code;
        btn.style.border = "3px solid #fffaf5";
        btn.setAttribute("data-name", opt.color.name);
        btn.onclick = () => handleColorAnswer(opt.isCorrect, opt.color.name);
        container.appendChild(btn);
    }
}

function handleColorAnswer(correct, colorName) {
    if (colorState.waitingNext) {
        document.getElementById("colorFeedback").innerHTML = "✨ Tekan 'Soalan seterusnya' untuk soalan baru ✨";
        return;
    }
    let fb = document.getElementById("colorFeedback");
    if (correct) {
        colorState.score++;
        document.getElementById("colorScore").innerHTML = `⭐ ${colorState.score}`;
        fb.innerHTML = `✅ BETUL! Warna ${colorName} sama! Bagus!`;
        fb.style.background = "#cbe6b5";
        colorState.waitingNext = true;
    } else {
        fb.innerHTML = `❌ Cuba lagi. ${colorName} bukan warna yang sama. Cuba cari warna yang sama dengan kotak di atas.`;
        fb.style.background = "#ffe0cc";
    }
}

// =============== PERMAINAN BENTUK ===============
function generateShapeOptions(correctShape) {
    let others = shapes.filter(s => s.name !== correctShape.name);
    let selected = shuffleArray([...others]).slice(0, 3);
    let opts = [{ shape: correctShape, isCorrect: true }, ...selected.map(s => ({ shape: s, isCorrect: false }))];
    return shuffleArray(opts);
}

function loadShapeGame() {
    shapeState.waitingNext = false;
    let rand = Math.floor(Math.random() * shapes.length);
    shapeState.current = shapes[rand];
    shapeState.options = generateShapeOptions(shapeState.current);
    document.getElementById("shapeTarget").innerHTML = shapeState.current.emoji;
    renderShapeOptions();
    let fb = document.getElementById("shapeFeedback");
    fb.innerHTML = "⭐ Klik bentuk yang serupa!";
    fb.style.background = "rgba(250, 243, 232, 0.95)";
}

function renderShapeOptions() {
    let container = document.getElementById("shapeOptions");
    container.innerHTML = "";
    for (let opt of shapeState.options) {
        let div = document.createElement("div");
        div.className = "shape-option";
        div.innerHTML = `
            <div class="shape-emoji">${opt.shape.emoji}</div>
            <div class="shape-label">${opt.shape.name}</div>
        `;
        div.onclick = () => handleShapeAnswer(opt.isCorrect, opt.shape.name);
        container.appendChild(div);
    }
}

function handleShapeAnswer(correct, shapeName) {
    if (shapeState.waitingNext) {
        document.getElementById("shapeFeedback").innerHTML = "✅ Tekan 'Soalan seterusnya' untuk soalan baharu!";
        return;
    }
    let fb = document.getElementById("shapeFeedback");
    if (correct) {
        shapeState.score++;
        document.getElementById("shapeScore").innerHTML = `⭐ ${shapeState.score}`;
        fb.innerHTML = `🎉 BETUL! Bentuk ${shapeName} sama! Terbaik! 🎉`;
        fb.style.background = "#cbe6b5";
        shapeState.waitingNext = true;
    } else {
        fb.innerHTML = `❌ Cuba lagi. ${shapeName} bukan bentuk yang sama. Cuba cari bentuk yang tepat sama.`;
        fb.style.background = "#ffe0cc";
    }
}

// =============== NAVIGASI ===============
function showGame(gameId) {
    document.getElementById("homePage").style.display = "none";
    document.querySelectorAll(".game-panel").forEach(p => p.style.display = "none");
    let activePanel = document.getElementById(gameId);
    activePanel.style.display = "flex";
    if (gameId === "gameFruit") loadFruitGame();
    if (gameId === "gameColor") loadColorGame();
    if (gameId === "gameShape") loadShapeGame();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome() {
    document.getElementById("homePage").style.display = "flex";
    document.querySelectorAll(".game-panel").forEach(p => p.style.display = "none");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Event listeners
document.querySelectorAll(".game-card").forEach(card => {
    card.addEventListener("click", (e) => {
        e.stopPropagation();
        let gameType = card.dataset.game;
        if (gameType === "matchFruit") showGame("gameFruit");
        else if (gameType === "matchColor") showGame("gameColor");
        else if (gameType === "matchShape") showGame("gameShape");
    });
});

document.querySelectorAll(".back-home-btn").forEach(btn => {
    btn.addEventListener("click", showHome);
});

document.getElementById("fruitNextBtn").onclick = () => {
    if (fruitState.waitingNext) loadFruitGame();
    else document.getElementById("fruitFeedback").innerHTML = "😊 Jawab soalan dulu dengan memilih buah yang sama ya!";
};

document.getElementById("colorNextBtn").onclick = () => {
    if (colorState.waitingNext) loadColorGame();
    else document.getElementById("colorFeedback").innerHTML = "🎨 Pilih warna yang sama terlebih dahulu.";
};

document.getElementById("shapeNextBtn").onclick = () => {
    if (shapeState.waitingNext) loadShapeGame();
    else document.getElementById("shapeFeedback").innerHTML = "🔷 Klik bentuk yang sama dahulu ya!";
};

// Papar halaman utama
document.getElementById("homePage").style.display = "flex";
document.querySelectorAll(".game-panel").forEach(p => p.style.display = "none");