import fs from 'fs';

class Challenge1 {
  private inputPath = 'day7/input.txt';

  public run() {
    const lines = this.readFile(this.inputPath);
    const sum = this.countSplits(lines);
    console.log('Sum: ', sum);
  }

  private countSplits(lines: string[]): number {
    const grid = lines.map(line => line.split(""));
  
    const height = grid.length;
    const width = grid[0].length;
  
    let startX: number | undefined;
    let startY: number | undefined;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] === "S") {
          startX = x;
          startY = y;
        }
      }
    }

    if (startX == undefined || startY == undefined)
      throw new Error('Error on finding start point');
  
    let active = new Set([startX]);
    let splitCount = 0;

    for (let i = startY + 1; i < height; i++) {
      const nextActive = new Set();

      for (const x of active) {
        if (x < 0 || x >= width) continue;

        const cell = grid[i][x];

        if (cell === ".") {
          nextActive.add(x);
        } else if (cell === "^") {
          splitCount++;
          nextActive.add(x - 1);
          nextActive.add(x + 1);
        } else {
          nextActive.add(x);
        }
      }

      active = nextActive;
      if (active.size === 0)
        break;
    }


    return splitCount;
  }
  

  private readFile(path: string){
    const file = fs.readFileSync(path, 'utf8');

    return file.split('\n');
  }
}

new Challenge1().run();