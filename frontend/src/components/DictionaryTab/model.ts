export namespace dictionaryTab {
  export class DictionarySelection {
    id: string;
    label: string;

    static createFrom(source: any = {}) {
      return new DictionarySelection(source);
    }

    constructor(source: any = {}) {
      if ("string" === typeof source) source = JSON.parse(source);
      this.id = source["id"];
      this.label = source["label"];
    }
  }
}
