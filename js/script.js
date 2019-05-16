"use strict";
let tab = new Array(10);
let pos_row;
let pos_col;
let interval;
let speed;
let speed_btn;
let run = false;
let mode = 'add';

document.getElementById(mode).classList.add("btn-clicked");

function initMaze() {
  initMainArray();
  createMaze();
  initTableClick()

  speed_btn = 'medium';
}

function initMainArray() {
  for (let i = 0; i < 10; ++i) {
    tab[i] = new Array(10);
    for (let j = 0; j < 10; ++j) {
      tab[i][j] = 0;
    }
  }
}

initMaze();

function createMaze() {
  let html = '<div><table id="board">';

  for (let i = 0; i < 10; i++) {
    html += '<tr>';
    for (let j = 0; j < 10; j++) {
      if (i == 0 && j == 7) {
        html += `<td id="cell_${i}_${j}" class="end_td"><span id="end">End</span></td>`;
      } else if (i == 9 && j == 2) {
        html += `<td id="cell_${i}_${j}" class="start_td"><span id="start">Start</span></td>`;
      } else {
        html += `<td id="cell_${i}_${j}"></td>`;
      }
    }
    html += '</tr>';
    document.getElementById('maze').innerHTML = html;
  }
}

function initTableClick() {
  let table = document.getElementById('board');
  table.addEventListener('click', (evt) => {
    let cell = evt.target;
    let ident = cell.getAttribute('id');
    let col = ident.charAt(5);
    let row = ident.charAt(7);
    if (mode == 'add' && tab[col][row] == 0) {
      cell.style.backgroundColor = "#ddd";
      cell.style.backgroundImage = "none";
      tab[col][row] = 1;
    } else if (mode == 'remove' && tab[col][row] == 1) {
      cell.style.backgroundImage = "url(img/wall.jpg)";
      tab[col][row] = 0;
    }
  });
}

function moveInterval() {
  if (run == false) {
    speed = 500;
    pos_row = 9;
    pos_col = 2;
    document.getElementById('cell_9_2').style.backgroundImage = "url(img/man.png)";
    tab[9][2]++;
    run = true;
    change();
  }
  interval = setInterval(function () {
    move();
  }, speed);
}

function changeInterval() {
  clearInterval(interval);
  moveInterval();
}

function move() {
  let down;
  let right;
  let left;
  let up; // value at tab
  let move = ''; // 'up' or 'right' or 'left' or 'down'
  let cell_id;
  let m;
  let ident = 'cell_' + pos_row + '_' + pos_col;
  document.getElementById(ident).style.backgroundColor = "#ddd";
  document.getElementById(ident).style.backgroundImage = "none";
  if (pos_row != 9)
    down = tab[pos_row + 1][pos_col];
  else
    down = 0;

  if (pos_row != 0)
    up = tab[pos_row - 1][pos_col];
  else
    up = 0;

  if (pos_col != 0)
    left = tab[pos_row][pos_col - 1];
  else
    left = 0;

  if (pos_col != 9)
    right = tab[pos_row][pos_col + 1];
  else
    right = 0;

  if (up != 0) {
    m = up;
    move = 'up';
  } else {
    m = 999;
    move = up;
  }
  if (down < m && down != 0) {
    m = down;
    move = 'down';
  }
  if (right < m && right != 0) {
    m = right;
    move = 'right';
  }
  if (left < m && left != 0) {
    m = left;
    move = 'left';
  }
  if (move == 'up') {
    pos_row--;
  } else if (move == 'down') {
    pos_row++;
  } else if (move == 'right') {
    pos_col++;
  } else if (move == 'left') {
    pos_col--;
  }
  ident = 'cell_' + pos_row + '_' + pos_col;
  document.getElementById(ident).style.backgroundImage = "url(img/man.png)";
  tab[pos_row][pos_col]++;

  if (pos_row == 0 && pos_col == 7) {
    end();
  }

  function end() {
    clearInterval(interval);
    alert("koniec!")
  }
}

function change() {
  let html = `<div id="btn-speed-group">
              <button class="btn-active" id="slow">Slow</button>
              <button class="btn-clicked" id="medium">Medium</button>
              <button class="btn-active" id="fast">Fast</button>
              </div>`;
  document.getElementById('up-nav').innerHTML = html;

  document.getElementById('btn-speed-group').addEventListener('click', (evt) => {
    let btn = evt.target;
    switch (btn.id) {
      case 'slow':
        {
          if (speed_btn != 'slow') {
            speed = 1000;
            change_btn(btn.id);

          }
          break;
        }
      case 'medium':
        {
          if (speed_btn != 'medium') {
            speed = 500;
            change_btn(btn.id);
          }
          break;
        }
      case 'fast':
        {
          if (speed_btn != 'fast') {
            speed = 250;
            change_btn(btn.id);
          }
          break;
        }
    }

    function change_btn(speed) {
      btn.classList.remove("btn-active");
      btn.classList.add("btn-clicked");
      document.getElementById(speed_btn).classList.remove("btn-clicked");
      document.getElementById(speed_btn).classList.add("btn-active");
      speed_btn = speed;
      changeInterval();
    }
  });
}

document.getElementById('run').addEventListener('click', () => {
  if (run == false)
    moveInterval();
});

document.getElementById('restart').addEventListener('click', () => {
  if (run == true) {
    mode = 'add';
    let html = `<button type="button" class="btn-clicked" id="add">Dodaj</button>
                <button type="button" class="btn-active" id="remove">Usuń</button>`
    document.getElementById('up-nav').innerHTML = html;
    up_nav_evt_init();
    run = false;
    clearInterval(interval);
  }
  createMaze();
});

function up_nav_evt_init() {
  document.getElementById('add').addEventListener('click', (evt) => {
    evt.currentTarget.classList.remove("btn-active");
    evt.currentTarget.classList.add("btn-clicked");
    document.getElementById(mode).classList.remove("btn-clicked");
    document.getElementById(mode).classList.add("btn-active");
    mode = 'add';
  });

  document.getElementById('remove').addEventListener('click', (evt) => {
    console.log('remove');
    evt.currentTarget.classList.remove("btn-active");
    evt.currentTarget.classList.add("btn-clicked");
    document.getElementById(mode).classList.remove("btn-clicked");
    document.getElementById(mode).classList.add("btn-active");
    mode = 'remove';
  });
}

up_nav_evt_init();
