import fs from 'fs';

type Dataset = {
  values: number[],
  operator?: string
}

class Challenge1 {
  private inputPath = 'day6/input.txt';
  private operators = ['+', '*'];

  public run() {
    const datasets = this.readFile(this.inputPath);

    let sum = 0;

    for(const dataset of datasets) {
      const value = this.handleDataset(dataset[1]);
      sum += value;
    }

    console.log('Sum: ', sum);
  }

  private readFile(path: string): Map<number, Dataset>{
    const file = fs.readFileSync(path, 'utf8');
    const lines = file.split('\n');

    const datasets: Map<number, Dataset> = new Map();

    for(const line of lines) {
      const values = line.split(' ').filter(value => value.length > 0);

      for(let i = 0; i < values.length; i++) {
        const dataset = datasets.get(i);
        if(dataset == undefined) {
          datasets.set(i, {
            values: [Number(values[i])],
            operator: undefined
          });
        } else {
          if (!this.operators.includes(values[i]))
            dataset.values.push(Number(values[i]));
          else
            dataset.operator = values[i];
          datasets.set(i, dataset);
        }
      }
      
    }

    return datasets;
  }

  private handleDataset(dataset: Dataset): number {
    if(dataset.operator == '+')
      return dataset.values.reduce((a, b) => a + b, 0);
    return dataset.values.reduce((a, b) => a * b, 1);
  }
}

new Challenge1().run();