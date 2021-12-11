let body = document.querySelector("body");
let container = document.createElement("div");
container.classList.add("container");
body.appendChild(container);
for (let i = 0; i < 9; i++) {
  let node = document.createElement("div");
  node.classList.add("box");
  node.id = `btn${i}`;
  node.index = i;
  container.appendChild(node);
}
let turn = true;
let btns = document.getElementsByClassName("box");
let set = {};
for (let element of btns) {
  element.addEventListener("click", function (e) {
    async = false;
    if (set[this.index] == undefined) {
      this.innerHTML = turn ? "X" : "O";
      this.style.color = turn ? "green" : "orange";
      set[this.index] = turn ? 1 : 0;
      turn = !turn;
      let win = checkWin(this.index);
      if (win != -1) {
        setTimeout(() => {
          alert(`Player ${win == 1 ? "X" : "O"} wins`);
          location.reload();
        }, 1);
      }
      if (Object.keys(set).length == 9) {
        setTimeout(() => {
          alert(`No Player wins.`);
          location.reload();
        }, 1);
      }
    }
  });
}
function checkWin(idx) {
  if (
    set[idx] == set[(idx + 3) % 9] &&
    set[idx] == set[(idx + 6) % 9] &&
    set[idx] != undefined
  ) {
    return set[idx];
  }
  let ridx = Number.parseInt(idx / 3);
  if (
    set[ridx * 3] == set[ridx * 3 + 1] &&
    set[ridx * 3] == set[ridx * 3 + 2] &&
    set[ridx * 3] != undefined
  ) {
    return set[ridx * 3];
  }
  if (
    (set[4] == set[0] && set[8] == set[4] && set[4] != undefined) ||
    (set[4] == set[2] && set[6] == set[4] && set[4] != undefined)
  ) {
    return set[4];
  }
  return -1;
}
