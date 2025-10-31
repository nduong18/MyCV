# Trang CV + Demo game (Cocos Creator)

Đây là template trang cá nhân để trình diễn CV và demo game bạn làm bằng Cocos Creator.

Hướng dẫn nhanh

- Mở `index.html` trên trình duyệt (double-click) để xem trang.
- Thêm demo game: copy web-build (output của Cocos Creator) vào `games/<slug>/`.

  - Ví dụ: copy dữ liệu build vào `games/merge-fruits/` sao cho có thể mở `games/merge-fruits/index.html`.
  - Nếu web-build tạo cấu trúc khác (ví dụ `build/web-mobile/index.html`), bạn có thể chỉnh `play` trong `app.js` tương ứng.

  Ví dụ cụ thể cho game bạn đề cập:

  - Source build trên máy của bạn có thể ở: `C:\Cocos Creator Game Project\ChooseYourAnswer\build\ChooseYourAnswer`
  - Copy toàn bộ folder `ChooseYourAnswer` vào trong workspace dưới đường dẫn `games\choose-your-answer\` sao cho file chính có thể mở tại `games/choose-your-answer/index.html`.

  Sau khi copy xong, mở trang chính và bấm "Play" (sẽ mở trong một modal iframe nếu server đang chạy) hoặc mở trực tiếp `games/choose-your-answer/index.html`.

- Thêm card mới: mở `app.js` và thêm 1 object vào mảng `games` với các thuộc tính:
  ```js
  {
    id: 'my-game',
    title: 'My Game',
    desc: 'Một mô tả ngắn',
    thumb: 'img/my-game.svg',
    play: 'games/my-game/index.html',
    source: 'https://github.com/yourname/my-game'
  }
  ```

Gợi ý deploy

- Để chia sẻ trực tuyến, host toàn bộ thư mục này trên GitHub Pages, Netlify hoặc Vercel.
- Nếu dùng GitHub Pages: commit và push repo, bật Pages từ branch `main` (hoặc `gh-pages`).

Chạy local server để kiểm tra (PowerShell trên Windows):

```powershell
# Nếu có Python 3
python -m http.server 8000

# Hoặc dùng npm http-server (nếu đã cài):
npx http-server . -p 8000
```

Sau đó mở `http://localhost:8000` và thử click Play — iframe modal sẽ load game từ `games/choose-your-answer/index.html`.

Ghi chú

- File `styles.css` và `app.js` chứa logic hiển thị.
- Các ảnh sample nằm trong `img/`. Bạn có thể thay bằng ảnh thực tế.
