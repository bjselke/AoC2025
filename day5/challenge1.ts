import fs from 'fs';

type Range = {
  start: number,
  end: number
}

class Challenge1 {
  private inputPath = 'day5/input.txt';

  public run() {
    const input = this.readFile(this.inputPath);
    let sum = 0;

    for(const id of input.ids) {
      if(this.isInRange(input.ranges, id))
        sum++;
    }

    console.log('Fresh ingredients: ', sum);
  }

  private isInRange(ranges: Range[], id: number): boolean {
    return ranges.some(range => id >= range.start && id <= range.end);
  }

  private readFile(path: string){
    const file = fs.readFileSync(path, 'utf8');
    const lines = file.split('\n');

    const ranges: Range[] = [];
    const ids: number[] = [];
    let isRange = true;

    for(const line of lines) {
      if(line.trim().length == 0) {
        isRange = false;
        continue;
      }
      if(isRange) {
        const parts = line.split('-');
       ranges.push({
        start: Number(parts[0]),
        end: Number(parts[1])
       }) ;
      } else {
        ids.push(Number(line));
      }
    }

    return {
      ranges,
      ids
    };
  }
}

new Challenge1().run();