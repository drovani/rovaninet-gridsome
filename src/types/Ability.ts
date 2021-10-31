export default class Ability {
  tiers: Array<AbilityTier>;

  constructor(public readonly name: string) {
    this.tiers = new Array<AbilityTier>(5);
  }
}

export class AbilityTier {
  cooldown = 0;
  spell_school?:
    | "Arcane"
    | "Nature"
    | "Shadow"
    | "Fire"
    | "Fel"
    | "Frost"
    | "Holy";
  spell_damage?:
    | "Arcane"
    | "Nature"
    | "Shadow"
    | "Fire"
    | "Fel"
    | "Frost"
    | "Holy";
  combo?:
    | "Arcane"
    | "Nature"
    | "Shadow"
    | "Fire"
    | "Fel"
    | "Frost"
    | "Holy"
    | "Any";

  constructor(
    public readonly description: string,
    public readonly speed: number
  ) {}
}
