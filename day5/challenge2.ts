import fs from 'fs';

type Range = {
  start: number,
  end: number
}

class Challenge1 {
  private inputPath = 'day5/input.txt';

  public run() {
    const ranges = this.readFile(this.inputPath);

    const merged = this.mergeRanges(ranges);
    const sum = this.sumIds(merged);

    console.log('Fresh ingredients: ', sum);
  }

  private sumIds(ranges: Range[]) {
    let sum = 0;
    for(const range of ranges) {
      sum += range.end - range.start + 1;
    }
    return sum;
  }

  private mergeRanges(ranges: Range[]): Range[] {
    if (ranges.length === 0) return [];
  
    // 1. Sortieren nach Startwert
    const sorted = [...ranges].sort((a, b) => a.start - b.start);
  
    // 2. Zusammenführen
    const result: Range[] = [sorted[0]];
  
    for (const current of sorted.slice(1)) {
      const last = result[result.length - 1];
  
      // Überlappung oder direkt angrenzend?
      if (current.start <= last.end) {
        // Zusammenführen
        last.end = Math.max(last.end, current.end);
      } else {
        // Kein Kontakt → neuer Bereich
        result.push({ ...current });
      }
    }
  
    return result;
  }

  private readFile(path: string): Range[] {
    const file = fs.readFileSync(path, 'utf8');
    const lines = file.split('\n');

    const ranges: Range[] = [];

    for(const line of lines) {
      if(line.trim().length == 0)
        break;

      const parts = line.split('-');
      ranges.push({
        start: Number(parts[0]),
        end: Number(parts[1])
      }) ;
    }

    return ranges;
  }
}

new Challenge1().run();