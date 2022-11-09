export class CONDITION {
  constructor(init?: Partial<CONDITION>) {
    Object.assign(this, init);
  }
  ARCHIVEKEY:      string = '';
  OFFSET:          string = '';
  OBJECT:          string = '';
  CONDITION:       string | number;
  DESCRIPTION:     string;
  QUERY:           string;
  "NAME:":         string;
  CONDITION_PARTS: CONDITION[] | any
}

export class CONDITION_PART {
  constructor(init?: Partial<CONDITION_PART>) {
    Object.assign(this, init);
  }
  index:                   any;
  CONDITION:               string = '';
  REFERENCED_CONDITION_ID: number;
  ENDING_BRACES:           number = 0;
  MATCH_FIELD:             string = '';
  MATCH_ENTITY:            string = '';
  MAX_VALUE:               number;
  MIN_VALUE:               number;
  OPERATION:               string = '';
  OPERATOR:                string = '';
  STARTING_BRACES:         number = 0;
}

