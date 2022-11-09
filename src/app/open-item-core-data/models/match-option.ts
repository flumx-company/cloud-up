import {MatchOptionValue} from "./match-option-value.enum";

export class MatchOption {
  constructor(public optionName: string, public optionValue: MatchOptionValue) {
  }
}
