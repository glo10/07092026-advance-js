import { describe, it, expect, beforeEach } from "vitest";
import { DataStorage } from "../../6.1/src/data-storage";

describe("Testing DataStorage", () => {
  let storage: DataStorage<string>;

  beforeEach(() => {
    storage = new DataStorage<string>();
  });

  it("Should be empty", () => {
    expect(storage.getAll()).toEqual([]);
  });

  it("Should add Apple", () => {
    storage.addItem("Apple");
    expect(storage.getAll()).toEqual(["Apple"]);
  });

  it("Should get Cherry from index 2", () => {
    storage.addItem("Apple");
    storage.addItem("Banane");
    storage.addItem("Cherry");
    expect(storage.getItem(2)).toBe("Cherry");
  });

  it("Should have got undefined when index not exist", () => {
    storage.addItem("Apple");
    expect(storage.getItem(5)).toBeUndefined();
  });

  it("Should work with interface User", () => {
    interface User {
      id: number;
      name: string;
    }
    const userStorage = new DataStorage<User>();
    const alice = { id: 1, name: "Alice" };
    userStorage.addItem(alice);
    expect(userStorage.getItem(0)).toEqual(alice);
  });

  it("Should work with Car Interface", () => {
    interface Car {
      data: {
        reference: string;
        categories: Array<string>;
      };
      error?: Error;
    }
    const cars = [
      {
        data: {
          reference: "ref123456",
          categories: ["electrique"],
          isElectric: true,
        },
      },
        {
        data: {
          reference: "ref7891011",
          categories: ["SUV", "4*4"],
          isElectric: false,
        },
      },
    ];
    const carStorage = new DataStorage(cars);
    carStorage.addItem(cars[1]);
    expect(carStorage.getItem(1)).toEqual(cars[1]);
  });
});
