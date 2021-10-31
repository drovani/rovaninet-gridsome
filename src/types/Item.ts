export default class Item {
  tiers: ItemTier[] = new Array<ItemTier>(4);
  affected_ability_name?: string;
  constructor(public readonly name: string) {}
}

export class ItemTier {
  replacement_text?: string;
  constructor(public readonly description: string) {}
}
