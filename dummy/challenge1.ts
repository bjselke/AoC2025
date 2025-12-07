import fs from 'fs';

class Challenge1 {
  private inputPath = 'day6/inputTest.txt';

  public run() {
    const input = this.readFile(this.inputPath);
    let sum = 0;


    console.log('Sum: ', sum);
  }

  private readFile(path: string){
    const file = fs.readFileSync(path, 'utf8');
    const lines = file.split('\n');


  }
}

new Challenge1().run();