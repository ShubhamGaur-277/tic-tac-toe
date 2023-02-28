


  
  let w; 
  let h; 
  
  let ai = 'X';
  let human = 'O';
  let currentPlayer = human;
  let grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  function setup() {
    var cnv=createCanvas(400, 400);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    w = width / 3;
    h = height / 3;
    bestMove();
  }
  
  function equals3(a, b, c) {
    return a == b && b == c && a != '';
  }
  
  function checkWhoWins() {
    let winner = null;
  
    for (let i = 0; i < 3; i++) {
      if (equals3(grid[i][0], grid[i][1], grid[i][2])) {
        winner = grid[i][0];
      }
    }
  
    for (let i = 0; i < 3; i++) {
      if (equals3(grid[0][i], grid[1][i], grid[2][i])) {
        winner = grid[0][i];
      }
    }
  
    if (equals3(grid[0][0], grid[1][1], grid[2][2])) {
      winner = grid[0][0];
    }
    if (equals3(grid[2][0], grid[1][1], grid[0][2])) {
      winner = grid[2][0];
    }
  
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] == '') {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  
  function mousePressed() {
    if (currentPlayer == human) {
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      if (grid[i][j] == '') {
        grid[i][j] = human;
        currentPlayer = ai;
        bestMove();
      }
    }
  }
  
  function draw() {
    background(40,40,40);
    
    strokeWeight(4);
  
    
    strokeCap(ROUND);
    line(w, 0, w, height);
    stroke(255);
    
    strokeCap(ROUND);
    line(w * 2, 0, w * 2, height);
    stroke(255);
    
    strokeCap(ROUND);
    line(0, h, width, h);
    stroke(255);
    
    strokeCap(ROUND);
    line(0, h * 2, width, h * 2);
    stroke(255);
  
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = grid[i][j];
        textSize(32);
        let r = w / 4;
        if (spot == human) {
          noFill();
          ellipse(x, y, r * 2);
        } else if (spot == ai) {
          line(x - r, y - r, x + r, y + r);
          line(x + r, y - r, x - r, y + r);
        }
      }
    }
  
    let result = checkWhoWins();
    if (result != null) {
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      resultP.style('color', '#FFFFFF');
      resultP.style('padding-left', '160px');
      resultP.style('padding-top', '100px');
      if (result == 'tie') {
        resultP.html('Tie!');
      } else {
        resultP.html(`${result} wins!`);
      }
    }
}