export class DataStorage<T> {
  constructor(private items : T[] = []) {}
  
  public addItem(item: T): void {
    this.items.push(item);
  }

  public getItem(index: number): T | undefined {
    return this.items[index];
  }

  public getAll(): readonly T[] {
    return this.items;
  }
}