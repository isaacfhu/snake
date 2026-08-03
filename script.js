document.addEventListener("DOMContentLoaded", () => {
  const hg1 = localStorage.getItem("hg1");
  document.querySelector("#hg-1").textContent = `Highscore: ${hg1}`;
});
