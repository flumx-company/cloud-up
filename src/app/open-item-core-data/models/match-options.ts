import {MatchOption} from "./match-option";
import {MatchOptionValue} from "./match-option-value.enum";

export class MatchOptions {
  static readonly list = [
    new MatchOption('All', MatchOptionValue.ALL),
    new MatchOption('Matched', MatchOptionValue.MATCHED),
    new MatchOption('Not matched', MatchOptionValue.NOT_MATCHED)
  ];
}
