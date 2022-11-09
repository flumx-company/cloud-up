export class AGENT_TYPE {
  constructor(init?: Partial<AGENT_TYPE>) {
    Object.assign(this, init);
  }
  AGENT_PARTS:                                              AGENT_PARTS[] | any  = [];
  ARCHIVEKEY:                                               string = '';
  ASSIGNEES:                                                Array<string> =[];
  COND_NUM:                                                 string | number;
  DESCRIPTION_TRANSLATE: DESCRIPTION_TRANSLATE[] = [];
  DESCRIPTION:                                              LABEL;
  OBJECT:                                                   string = '';
  OFFSET:                                                   string = '';
  STATUS:                                                   string | number;
  TENANT_ID:                                                string = '';
  TYPE:                                                     string = '';
  CONDITION:                                                string | number;
  SCOPE:                                                    string = '';
  NAME:                                                     string = '';
  REC_TYPE:                                                 string = '';
  RULE_ID:                                                  string = '';
  index:                                                    number;
  _ID:                                                      string = '';
}

class DESCRIPTION_TRANSLATE {
  LANG: string;
  VALUE: string;
  MESSAGE: string;
  TOOLTIP: string;
}


export class AGENT_PARTS {
  constructor(init?: Partial<AGENT_PARTS>) {
    Object.assign(this, init);
  }
  index:                   any;
  CONDITION:               string = '';
  REFERENCED_CONDITION_ID: number;
  ENDING_BRACES:           number = 0;
  MATCH_FIELD:             string = '';
  MATCH_ENTITY:            string = '';
  VALUE:                   number;
  OPERATION:               string = '';
  OPERATOR:                string = '';
  STARTING_BRACES:         number = 0;
}
export class LABEL {
  constructor(init?: Partial<LABEL>) {
    Object.assign(this, init);
  }
  LABEL:               string = '';
}

