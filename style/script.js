// Nút hiệu ứng nhỏ
document.querySelector(".advanced-btn").addEventListener("click", () => {
  alert("Tính năng nâng cao đang được phát triển 🚀");
});
// Hiệu ứng parallax background
document.addEventListener("mousemove", (e) => {
  const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

  document.body.style.backgroundPosition = `${50 - moveX}% ${50 - moveY}%`;
});

// Hiệu ứng nút "Chi tiết nâng cao"
document.querySelector(".advanced-btn").addEventListener("click", () => {
  alert("✨ Tính năng nâng cao đang được phát triển!");
});
