import {ListObject} from '../../shared/models/list-object';
import {OpenItemFieldList} from '../../shared/models/open-item-field-list';

export class MatchFieldList {
  static readonly businesspartnerFields = [
    new ListObject({
      displayName: 'CONTRACT',
      technicalName: 'contract',
      description: 'Contract'
    }),
    new ListObject({
      technicalName: 'DEBITOR',
      displayName: 'DEBITOR',
      description: 'Debitor account'
    }),
    new ListObject({
      technicalName: 'CREDITOR',
      displayName: 'CREDITOR',
      description: 'Creditor account'
    }),
    new ListObject({
      technicalName: 'NOMINALACCOUNT',
      displayName: 'NOMINALACCOUNT',
      description: 'Nominal account'
    })
  ];

  static readonly remittanceAdviceFields = [
    new ListObject({
      technicalName: 'remittanceAdviceExternalId',
      displayName: 'REMADV_IDEXT',
      description: 'External remittance advice identifier'
    }),
    new ListObject(
        {technicalName: 'payer', displayName: 'PAYER', description: 'Payer'}),
    new ListObject({
      technicalName: 'alternatePayer',
      displayName: 'ALTERNATE_PAYER',
      description: 'Alternative payer'
    }),
    new ListObject({
      technicalName: 'remittanceAdviceReference1',
      displayName: 'REMADV_REF_1',
      description: 'Remittance advice reference #1'
    }),
    new ListObject({
      technicalName: 'remittanceAdviceReference2',
      displayName: 'REMADV_REF_2',
      description: 'Remittance advice reference #2'
    }),
    new ListObject({
      technicalName: 'remittanceAdviceReference3',
      displayName: 'REMADV_REF_3',
      description: 'Remittance advice reference #3'
    }),
    new ListObject({
      technicalName: 'remittanceAdviceReference4',
      displayName: 'REMADV_REF_4',
      description: 'Remittance advice reference #4'
    }),
    new ListObject({
      technicalName: 'remittanceAdviceReference5',
      displayName: 'REMADV_REF_5',
      description: 'Remittance advice reference #5'
    }),
    new ListObject({
      technicalName: 'remittanceAdviceReference6',
      displayName: 'REMADV_REF_6',
      description: 'Remittance advice reference #6'
    }),
    new ListObject({
      technicalName: 'remittanceAdviceReference7',
      displayName: 'REMADV_REF_7',
      description: 'Remittance advice reference #7'
    }),
    new ListObject({
      technicalName: 'archiveId',
      displayName: 'ARC_ID',
      description: 'Archive identifier'
    }),
    new ListObject({
      technicalName: 'emailSender',
      displayName: 'EMAIL_SENDER',
      description: 'Email address of sender'
    }),
    new ListObject({
      technicalName: 'emailSenderInRemittanceAdvice',
      displayName: 'EMAIL_SENDER_AVS',
      description: 'Email address of sender in remittance advice'
    }),
    new ListObject({
      technicalName: 'customerAccount',
      displayName: 'CUST_ACCOUNT',
      description: 'Customer account number'
    }),
    new ListObject({
      technicalName: 'name1Sender',
      displayName: 'NAME1_SENDER',
      description: 'Name of sender #1'
    }),
    new ListObject({
      technicalName: 'name2Sender',
      displayName: 'NAME2_SENDER',
      description: 'Name of sender #2'
    }),
    new ListObject({
      technicalName: 'telephoneNumberSender',
      displayName: 'TELNO_SENDER',
      description: 'Telephone number of sender'
    }),
    new ListObject({
      technicalName: 'faxSender',
      displayName: 'FAX_SENDER',
      description: 'Fax number of sender'
    }),
    new ListObject({
      technicalName: 'taxNumberSender',
      displayName: 'TAXNO_SENDER',
      description: 'Tax identification number'
    }),
    new ListObject({
      technicalName: 'salesTaxNumberSender',
      displayName: 'SALESTAXNO_SENDER',
      description: 'Sales tax number'
    }),
    new ListObject({
      technicalName: 'traderegisterNumberSender',
      displayName: 'TRADEREGISTERNO_SENDER',
      description: 'Trade register number'
    }),
    new ListObject({
      technicalName: 'accountHolder',
      displayName: 'ACCOUNT_HOLDER',
      description: 'Account holder'
    })
  ];

  static readonly fields = OpenItemFieldList.list;
}