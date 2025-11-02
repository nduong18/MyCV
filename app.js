// Danh sách game/demo. Thêm object mới vào mảng này để hiện thị card.
const games = [
  {
    id: "merge-fruits",
    title: "Merge Fruits",
    desc: "Hợp nhất trái cây để tiến hóa. Physics, pooling, tween",
    thumb: "img/merge-fruits.svg",
    play: "games/merge-fruits/index.html",
    source: "https://github.com/nduong18/MergeFruits",
  },
  {
    id: "this-or-that",
    title: "This or That",
    desc: "Choose between two options. Simple UI system.",
    thumb: "img/this-or-that.svg",
    play: "https://this-or-that-jet.vercel.app/",
    source: "https://github.com/yourname/this-or-that-build",
  },
  {
    id: "coloring-challenge",
    title: "Coloring Challenge",
    desc: "Trò chơi tô màu đơn giản. Sử dụng hệ thống UI cơ bản.",
    thumb: "img/coloring-challenge.svg",
    play: "games/coloring-challenge/index.html",
    source: "https://github.com/yourname/coloring-challenge",
  },
  {
    id: "choose-your-answer",
    title: "Choose Your Answer",
    desc: "Choose the correct answer from multiple choices. Use tween",
    thumb: "img/choose-your-answer.svg",
    play: "https://choose-your-answer.vercel.app/",
    source: "https://github.com/nduong18/choose-your-answer-source",
  },
];

function createCard(g) {
  const el = document.createElement("article");
  el.className = "card";

  const thumb = document.createElement("div");
  thumb.className = "thumb";
  const img = document.createElement("img");
  img.src = g.thumb || "img/placeholder.svg";
  img.alt = g.title;
  thumb.appendChild(img);

  // (play overlay/button removed)

  const info = document.createElement("div");
  info.className = "info";
  const h = document.createElement("h4");
  h.textContent = g.title;
  const p = document.createElement("p");
  p.textContent = g.desc;
  info.appendChild(h);
  info.appendChild(p);

  const actions = document.createElement("div");
  actions.className = "actions";

  const aPlay = document.createElement("a");
  aPlay.className = "btn-ghost";
  aPlay.textContent = "Play";
  aPlay.target = "_blank";
  // Nếu đường dẫn play tồn tại thì mở trong modal nội trang (nếu hỗ trợ),
  // fallback: mở tab mới.
  aPlay.href = g.play;
  aPlay.addEventListener("click", (ev) => {
    ev.preventDefault();
    openGameModal(g.play, g.title);
  });

  const aSource = document.createElement("a");
  aSource.className = "btn-ghost";
  aSource.textContent = "Source";
  aSource.target = "_blank";
  aSource.href = g.source || "#";

  actions.appendChild(aPlay);
  actions.appendChild(aSource);

  el.appendChild(thumb);
  el.appendChild(info);
  el.appendChild(actions);

  return el;
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  games.forEach((g) => grid.appendChild(createCard(g)));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
});

// Hướng dẫn nhanh: để thêm demo Cocos Creator, copy web-build của bạn vào
// `games/<slug>/` và đảm bảo có file index.html (hoặc chỉnh đường dẫn trong `games` array).

// --- modal logic: create/open/close iframe modal ---
function openGameModal(src, title) {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameIframe");
  const modalTitle = document.getElementById("gameModalTitle");
  if (!modal || !iframe) {
    // fallback: open in new tab
    window.open(src, "_blank");
    return;
  }
  modalTitle.textContent = title || "Game";
  iframe.src = src;
  modal.classList.add("open");
}

function closeGameModal() {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameIframe");
  if (!modal) return;
  modal.classList.remove("open");
  if (iframe) iframe.src = "about:blank";
}

// Close when clicking backdrop or close button
document.addEventListener("click", (e) => {
  if (
    e.target.matches(".game-modal") ||
    e.target.closest(".game-modal .close")
  ) {
    closeGameModal();
  }
});

// --- popup logic: open centered popup window ---
function openGamePopup(url, title, w = 980, h = 640) {
  if (!url) return;
  // Calculate center position
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;
  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;
  const left = dualScreenLeft + Math.max(0, Math.floor((width - w) / 2));
  const top = dualScreenTop + Math.max(0, Math.floor((height - h) / 2));

  const features = `scrollbars=yes,resizable=yes,toolbar=no,location=no,status=no,menubar=no,width=${w},height=${h},top=${top},left=${left}`;
  const popup = window.open(url, title || "_blank", features);
  // If popup failed to open (blocked), fallback to new tab
  if (!popup) {
    window.open(url, "_blank");
    return null;
  }
  try {
    // Focus the popup if possible
    if (popup.focus) popup.focus();
  } catch (err) {
    // ignore
  }
  return popup;
}
