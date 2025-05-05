class PasswordGenerator {
  private readonly types: Record<string, number> = {
    lettersSmall: 0,
    lettersBig: 1,
    numbers: 2,
    specials: 3
  } as const;
  private distribution: Partial<Record<"lettersSmall" | "lettersBig" | "numbers" | "specials", number>> = {
    lettersSmall: 1,
    lettersBig: 1,
    numbers: 1,
    specials: 1
  }
  private _length: number = 8;
  private charSets?: Record<number, (string | number)[]>;
  private structure?: number[];
  private password?: string[];
  
  constructor() {
    this.init();
  }
  private init() {
    this.charSets = {
      [this.types.lettersSmall]: this.range('a', 'z'),
      [this.types.lettersBig]: this.range('A', 'Z'),
      [this.types.numbers]: this.range(0, 9),
      [this.types.specials]: [
        ...this.range('!', '/'),
        ...this.range(':', '@'),
        ...this.range('[', '`'),
        ...this.range('{', '~')
      ]
    };
  }
  private range<T extends string | number>(min: T, max: T): T[] {
    const start = typeof min === 'number' ? min : min.charCodeAt(0);
    const end = typeof max === 'number' ? max : max.charCodeAt(0);
    const result: T[] = [];
    for (let i = start; i <= end; i++) {
      result.push(typeof min === 'number' ? i as T : String.fromCharCode(i) as T);
    }
    return result;
  }
  private shuffle<T>(array: T[]): T[] {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  private getDistributionSum(){
    return Object.values(this.distribution).reduce((sum, val) => sum + (val ?? 0), 0);
  }
  private calcDistribution(){
    const sum = this.getDistributionSum();
    const distribution = {
      lettersSmall: Math.floor(this.distribution.lettersSmall! * 1 / sum * this.length),
      lettersBig: Math.floor(this.distribution.lettersBig! * 1 / sum * this.length),
      numbers: Math.floor(this.distribution.numbers! * 1 / sum * this.length),
      specials: Math.floor(this.distribution.specials! * 1 / sum * this.length)
    }
    this.distribution = distribution;
  }
  private createStructure(){
    let structure = [
      ...Array(this.distribution.lettersSmall!).fill(this.types.lettersSmall),
      ...Array(this.distribution.lettersBig!).fill(this.types.lettersBig),
      ...Array(this.distribution.numbers!).fill(this.types.numbers),
      ...Array(this.distribution.specials!).fill(this.types.specials)
    ];
    for (let i = structure.length; i < this.length; i++) {
      structure.push(this.types.lettersSmall);
    }
    this.structure = structure.sort();
  }
  private generatePassword(){
    if (!this.structure) throw new Error("Structure not defined");
    const password = this.shuffle(this.structure).map(type => {
      const charSet = this.charSets![type];
      const char = charSet[Math.floor(Math.random() * charSet.length)];
      return char.toString();
    });
    this.password = password;
  }
  public get length() {
    return this._length;
  }
  public get() {
    if (!this.password) throw new Error("Password not generated");
    return this.password.join('');
  }
  public set length(length: number) {
    if (length < 8) throw new Error("Length too short");
    this._length = length;
  }
  public set setDistribution(distribution: Partial<Record<"lettersSmall" | "lettersBig" | "numbers" | "specials", number>>) {
    this.distribution = {
      "lettersSmall": distribution.lettersSmall ?? 0,
      "lettersBig": distribution.lettersBig ?? 0,
      "numbers": distribution.numbers ?? 0,
      "specials": distribution.specials ?? 0,
    };
  }
  public generate() {
    this.calcDistribution();
    this.createStructure();
    this.generatePassword();
    return this.get();
  }
  public getQuality() {
    if (!this.password) throw new Error("Password not generated");
    let posibles = 0;
    if (this.distribution.lettersSmall) posibles += this.charSets![this.types.lettersSmall].length;
    if (this.distribution.lettersBig) posibles += this.charSets![this.types.lettersBig].length;
    if (this.distribution.numbers) posibles += this.charSets![this.types.numbers].length;
    if (this.distribution.specials) posibles += this.charSets![this.types.specials].length;
    const quality = Math.log2(posibles ** this.length);
    return quality;
  }
}


// ab hier nur tests
const passwordGenerator = new PasswordGenerator();
passwordGenerator.length = 8;
passwordGenerator.setDistribution = {
  lettersSmall: 1,
  lettersBig: 1,
  numbers: 1,
  specials: 1
};

for(let i = 1; i <= 10; i++){
  passwordGenerator.generate()
  console.log("pass: ", passwordGenerator.get(), "quality: ", Math.floor(passwordGenerator.getQuality()), " Bits");
}
passwordGenerator.length = 12;
for(let i = 1; i <= 10; i++){
  passwordGenerator.generate()
  console.log("pass: ", passwordGenerator.get(), "quality: ", Math.floor(passwordGenerator.getQuality()), " Bits");
}
passwordGenerator.length = 20;
for(let i = 1; i <= 10; i++){
  passwordGenerator.generate()
  console.log("pass: ", passwordGenerator.get(), "quality: ", Math.floor(passwordGenerator.getQuality()), " Bits");
}