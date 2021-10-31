import Ability from "./Ability";
import Item from "./Item";

export default class Character {
  static AllianceRaces = ["Human", "Night Elf", "Gnome", "Dwarf", "Draenai"];
  static HordeRaces = ["Orc", "Tauren", "Blood Elf", "Troll", "Undead"];
  static NeutralRace = ["Murloc", "Demon"];

  abilities: Ability[] = new Array<Ability>(3);
  equipment: Item[] = new Array<Item>(3);
  readonly faction: "Alliance" | "Horde" | "Neutral";

  constructor(
    public readonly name: string,
    public readonly race: string,
    public readonly role: string
  ) {
    this.faction = Character.AllianceRaces.includes(race)
      ? "Alliance"
      : Character.HordeRaces.includes(race)
      ? "Horde"
      : "Neutral";
  }

  addAbility(
    ability: Ability,
    position: "left" | "center" | "right"
  ): Ability[] {
    switch (position) {
      case "left":
        this.abilities[0] = ability;
        break;
      case "center":
        this.abilities[1] = ability;
        break;
      case "right":
        this.abilities[2] = ability;
        break;
      default: {
        const _exhaustiveCheck: never = position;
        throw new Error(`Unhandled position case: ${_exhaustiveCheck}`);
      }
    }
    return this.abilities;
  }
  addEquipment(item: Item, position: "left" | "center" | "right"): Item[] {
    switch (position) {
      case "left":
        this.equipment[0] = item;
        break;
      case "center":
        this.equipment[1] = item;
        break;
      case "right":
        this.equipment[2] = item;
        break;
      default: {
        const _exhaustiveCheck: never = position;
        throw new Error(`Unhandled position case: ${_exhaustiveCheck}`);
      }
    }
    return this.equipment;
  }
}
