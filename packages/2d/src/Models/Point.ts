export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }

  opposite(): Point {
    return new Point(-this.x, -this.y);
  }

  oppositeMutate(): this {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  add(other: Point | number): Point {
    if (typeof other === "number") {
      return new Point(this.x + other, this.y + other);
    } else {
      return new Point(this.x + other.x, this.y + other.y);
    }
  }

  addMutate(other: Point | number): this {
    if (typeof other === "number") {
      this.x += other;
      this.y += other;
    } else {
      this.x += other.x;
      this.y += other.y;
    }
    return this;
  }

  subtract(other: Point | number): Point {
    if (typeof other === "number") {
      return new Point(this.x - other, this.y - other);
    } else {
      return new Point(this.x - other.x, this.y - other.y);
    }
  }

  subtractMutate(other: Point | number): this {
    if (typeof other === "number") {
      this.x -= other;
      this.y -= other;
    } else {
      this.x -= other.x;
      this.y -= other.y;
    }
    return this;
  }

  multiply(other: Point | number): Point {
    if (typeof other === "number") {
      return new Point(this.x * other, this.y * other);
    } else {
      return new Point(this.x * other.x, this.y * other.y);
    }
  }

  multiplyMutate(other: Point | number): this {
    if (typeof other === "number") {
      this.x *= other;
      this.y *= other;
    } else {
      this.x *= other.x;
      this.y *= other.y;
    }
    return this;
  }

  divide(other: Point | number): Point {
    if (typeof other === "number") {
      return new Point(this.x / other, this.y / other);
    } else {
      return new Point(this.x / other.x, this.y / other.y);
    }
  }

  divideMutate(other: Point | number): this {
    if (typeof other === "number") {
      this.x /= other;
      this.y /= other;
    } else {
      this.x /= other.x;
      this.y /= other.y;
    }
    return this;
  }

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  distanceTo(other: Point): number {
    return Math.sqrt(
      Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2)
    );
  }

  round(): Point {
    return new Point(Math.round(this.x), Math.round(this.y));
  }

  roundMutate(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  roundDown(): Point {
    return new Point(Math.floor(this.x), Math.floor(this.y));
  }

  roundDownMutate(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  roundUp(): Point {
    return new Point(Math.ceil(this.x), Math.ceil(this.y));
  }

  roundUpMutate(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  mutateInto(other: Point) {
    this.x = other.x;
    this.y = other.y;
  }

  asDOMPoint(): DOMPoint {
    if (window.DOMPoint) {
      return new DOMPoint(this.x, this.y);
    }

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (typeof (g as any).createSVGPoint === "function") {
      const point = (g as any).createSVGPoint();
      point.x = this.x;
      point.y = this.y;
      return point;
    } else {
      throw new Error("Unable to convert Point to DOMPoint on this browser");
    }
  }

  transformUsingMatrix(matrix: DOMMatrix): Point {
    const domPoint = this.asDOMPoint();
    const transformed = domPoint.matrixTransform(matrix);
    return new Point(transformed.x, transformed.y);
  }

  transformUsingMatrixMutate(matrix: DOMMatrix): this {
    const domPoint = this.asDOMPoint();
    const transformed = domPoint.matrixTransform(matrix);
    this.x = transformed.x;
    this.y = transformed.y;
    return this;
  }
}