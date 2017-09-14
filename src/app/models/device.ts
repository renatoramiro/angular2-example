export class Device {
  name: string;
  type: string;
  created_at: Date;

  constructor(name, type, created_at) {
    this.name = name;
    this.type = type;
    this.created_at = created_at;
  }
}
