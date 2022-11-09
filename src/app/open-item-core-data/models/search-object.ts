import {ReferenceField} from './reference-field';
import {MatchOption} from "./match-option";

export class SearchObject {
  matched: MatchOption;

  accountingSystemId: string | undefined;
  companyId: string | undefined;

  accountType: string | undefined;

  accounts: string[] = [];
  documentNumbersString: string | undefined;

  dateField: string | undefined;
  dateFrom: string | undefined;
  dateTo: string | undefined;

  amountField: string | undefined;
  amountCurrency: string | undefined;
  amount: number | undefined;

  referenceField1: ReferenceField | undefined;
  referenceField1Value: string | undefined;
  referenceField2: ReferenceField | undefined;
  referenceField2Value: string | undefined;

  referenceField3: ReferenceField | undefined;
  referenceField3Value: string | undefined;
}
