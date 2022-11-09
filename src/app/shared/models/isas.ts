import {ISASTable} from './isas-table';
import {ListObject} from './list-object';

export class ISAS {
  static isDateField(field?: string): boolean {
    switch (field) {
      case 'createDate':
      case 'CREATE_DATE':
      case 'bankPostdate':
      case 'BANK_POSTDATE':
      case 'documentPostdate':
      case 'DOC_POSTDATE':
      case 'valueDate':
      case 'VALUE_DATE':
      case 'settlementDate':
      case 'SETTLM_DATE':
      case 'paymentDate':
      case 'PAYM_DATE':
      case 'invoiceDate':
      case 'INVOICE_DATE':
        return true;
      default:
        return false;
    }
  }

  static readonly tables = [
    new ISASTable({
      technicalName: 'ISASControl',
      displayName: 'ISAS',
      description: 'ISAS general information',
      isasFields:
          [
            new ListObject({
              technicalName: 'origin',
              displayName: 'Origin',
              description: 'Unique origin identifier'
            }),
            new ListObject({
              technicalName: 'originGroup',
              displayName: 'Origin Group',
              description: 'Origin group identifier'
            }),
            new ListObject({
              technicalName: 'formatOrigin',
              displayName: 'Format',
              description: 'Format name'
            }),
            new ListObject({
              technicalName: 'formatType',
              displayName: 'Format Type',
              description: 'Format type'
            })
          ]
    }),
    new ISASTable({
      technicalName: 'BankStatementHeader',
      displayName: 'BANKSTMT_HEADER',
      type: 'BANK_STATEMENT',
      description: 'Bank statement header information',
      isasFields:
          [
            new ListObject({
              technicalName: 'id',
              displayName: 'ID',
              description: 'Bank statement identifier'
            }),
            new ListObject({
              technicalName: 'accountType',
              displayName: 'ACCT_TYPE',
              description: 'Account type'
            }),
            new ListObject({
              technicalName: 'bankBIC',
              displayName: 'BANK_BIC',
              description: 'BIC of bank account'
            }),
            new ListObject({
              technicalName: 'bankIBAN',
              displayName: 'BANK_IBAN',
              description: 'IBAN of bank account'
            }),
            new ListObject({
              technicalName: 'bankCodeNumber',
              displayName: 'BANK_BCNO',
              description: 'Bank code number'
            }),
            new ListObject({
              technicalName: 'bankAccountNumber',
              displayName: 'BANK_BANO',
              description: 'Bank account number'
            }),
            new ListObject({
              technicalName: 'sequenceNumber',
              displayName: 'SEQNO',
              description: 'Statement sequence number'
            }),
            new ListObject({
              technicalName: 'createDate',
              displayName: 'CREATE_DATE',
              description: 'Statement creation date'
            }),
            new ListObject({
              technicalName: 'accountCurrency',
              displayName: 'ACCT_CURR',
              description: 'Account Currency-Module'
            })
          ]
    }),
    new ISASTable({
      technicalName: 'BankStatementPosition',
      displayName: 'BANKSTMT_POSITION',
      type: 'BANK_STATEMENT',
      description: 'Bank statement position information',
      isasFields:
          [
            new ListObject({
              technicalName: 'bankPostdate',
              displayName: 'BANK_POSTDATE',
              description: 'Bank booking date'
            }),
            new ListObject({
              technicalName: 'documentPostdate',
              displayName: 'DOC_POSTDATE',
              description: 'Document booking date'
            }),
            new ListObject({
              technicalName: 'valueDate',
              displayName: 'VALUE_DATE',
              description: 'Value date'
            }),
            new ListObject({
              technicalName: 'paymentCurrency',
              displayName: 'PAYM_CURR',
              description: 'Payment Currency-Module'
            }),
            new ListObject({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR',
              description: 'Credit/Debit indicator (CRDT/DBIT)'
            }),
            new ListObject({
              technicalName: 'paymentAmount',
              displayName: 'PAYM_AMOUNT',
              description: 'Payment amount'
            }),
            new ListObject({
              technicalName: 'externalBusinessTransactionCode',
              displayName: 'EXT_BUSINESS_TA',
              description: 'External business transaction code'
            }),
            new ListObject({
              technicalName: 'textkey',
              displayName: 'TEXTKEY',
              description: 'Text key'
            }),
            new ListObject({
              technicalName: 'bankPostingtext',
              displayName: 'BANK_POSTINGTXT',
              description: 'Bank posting text'
            }),
            new ListObject({
              technicalName: 'partnerBankCountryCode',
              displayName: 'PA_BANKCOUNTRYCODE',
              description: 'Partner bank country code'
            }),
            new ListObject({
              technicalName: 'partnerBankCodeNumber',
              displayName: 'PA_BANKCODENO',
              description: 'Partner bank code number'
            }),
            new ListObject({
              technicalName: 'partnerBIC',
              displayName: 'PA_BIC',
              description: 'Partner BIC'
            }),
            new ListObject({
              technicalName: 'partnerBankAccountNumber',
              displayName: 'PA_BANKACCTNO',
              description: 'Partner bank account number'
            }),
            new ListObject({
              technicalName: 'partnerName',
              displayName: 'PA_NAME',
              description: 'Partner name'
            }),
            new ListObject({
              technicalName: 'partnerIBAN',
              displayName: 'PA_IBAN',
              description: 'Partner IBAN'
            }),
            new ListObject({
              technicalName: 'daybookNumber',
              displayName: 'DAYBOOKNO',
              description: 'Prima nota'
            }),
            new ListObject({
              technicalName: 'checkNumber',
              displayName: 'CHECKNO',
              description: 'Check number'
            }),
            new ListObject({
              technicalName: 'avisId',
              displayName: 'AVISID',
              description: 'Avis identifier'
            }),
            new ListObject({
              technicalName: 'bankReference',
              displayName: 'BANK_REFERENCE',
              description: 'Bank reference'
            }),
            new ListObject({
              technicalName: 'paymentReference',
              displayName: 'PAYM_REFERENCE',
              description: 'Payment reference'
            }),
            new ListObject({
              technicalName: 'c2cReference',
              displayName: 'C2C_REFERENCE',
              description: 'Customer-To-Customer reference #1'
            }),
            new ListObject({
              technicalName: 'c2cReference2',
              displayName: 'C2C_REFERENCE2',
              description: 'Customer-To-Customer reference #2'
            })
          ]
    }),
    new ISASTable({
      technicalName: 'BankStatementAmount',
      displayName: 'BANKSTMT_AMOUNT',
      type: 'BANK_STATEMENT',
      description: 'Bank statement amount information',
      isasFields:
          [
            new ListObject({
              technicalName: 'amountType',
              displayName: 'AMT_TYPE',
              description: 'Internal amount type'
            }),
            new ListObject({
              technicalName: 'amountTypeExternal',
              displayName: 'AMT_TYPE_EXT',
              description: 'External amount type'
            }),
            new ListObject({
              technicalName: 'amountCurrency',
              displayName: 'AMT_CURR',
              description: 'Amount Currency-Module'
            }),
            new ListObject({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR',
              description: 'Credit/Debit indicator (CRDT/DBIT)'
            }),
            new ListObject({
              technicalName: 'amount',
              displayName: 'AMOUNT',
              description: 'Amount'
            }),
            new ListObject({
              technicalName: 'fxrate',
              displayName: 'FXRATE',
              description: 'Exchange rate to account Currency-Module'
            }),
            new ListObject({
              technicalName: 'validated',
              displayName: 'VALIDATED',
              description: 'Amount checked against OI'
            })
          ]
    }),
    new ISASTable({
      technicalName: 'BankStatementNTP',
      displayName: 'BANKSTMT_NTP',
      type: 'BANK_STATEMENT',
      description: 'Bank statement Note-To-Payee',
      isasFields:
          [
            new ListObject({
              technicalName: 'noteToPayeeId',
              displayName: 'NTP_ID',
              description: 'Note-To-Payee reference'
            }),
            new ListObject({
              technicalName: 'noteToPayee',
              displayName: 'NTP',
              description: 'Note-To-Payee'
            })
          ]
    }),
    new ISASTable({
      technicalName: 'RemittanceAdviceHeader',
      displayName: 'REMADV_HEADER',
      type: 'REMITTANCE_ADVICE',
      description: 'Remittance advice header information',
      isasFields:
          [
            new ListObject({
              technicalName: 'remittanceAdviceId',
              displayName: 'REMADV_ID',
              description: 'Remittance advice identifier'
            }),
            new ListObject({
              technicalName: 'remittanceAdviceExternalId',
              displayName: 'REMADV_IDEXT',
              description: 'External remittance advice identifier'
            }),
            new ListObject({
              technicalName: 'payer',
              displayName: 'PAYER',
              description: 'Payer'
            }),
            new ListObject({
              technicalName: 'alternatePayer',
              displayName: 'ALTERNATE_PAYER',
              description: 'Alternative payer'
            }),
            new ListObject({
              technicalName: 'remittanceAdviceSender',
              displayName: 'REMADV_SENDER',
              description: 'Remittance advice sender'
            }),
            new ListObject({
              technicalName: 'remittanceAdviceReceiver',
              displayName: 'REMADV_RECEIVER',
              description: 'Remittance advice receiver'
            }),
            new ListObject({
              technicalName: 'settlementDate',
              displayName: 'SETTLM_DATE',
              description: 'Settlement date'
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
              technicalName: 'paymentCurrency',
              displayName: 'PAYM_CURR',
              description: 'Payment Currency-Module'
            }),
            new ListObject({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR',
              description: 'Credit/Debit indicator (CRDT/DBIT)'
            }),
            new ListObject({
              technicalName: 'paymentAmount',
              displayName: 'PAYM_AMOUNT',
              description: 'Payment amount'
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
              technicalName: 'emailReceiver',
              displayName: 'EMAIL_RECEIVER',
              description: 'Email address of receiver'
            }),
            new ListObject({
              technicalName: 'paymentDate',
              displayName: 'PAYM_DATE',
              description: 'Payment date'
            }),
            new ListObject({
              technicalName: 'emailSubject',
              displayName: 'EMAIL_SUBJECT',
              description: 'Subject of email'
            }),
            new ListObject({
              technicalName: 'filename',
              displayName: 'FILENAME',
              description: 'Original filename'
            }),
            new ListObject({
              technicalName: 'createDate',
              displayName: 'CREATE_DATE',
              description: 'Remittance advice creation date'
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
              technicalName: 'streetSender',
              displayName: 'STREET_SENDER',
              description: 'Street name of sender'
            }),
            new ListObject({
              technicalName: 'citySender',
              displayName: 'CITY_SENDER',
              description: 'City name of sender'
            }),
            new ListObject({
              technicalName: 'postCodeSender',
              displayName: 'POSTCODE_SENDER',
              description: 'Postcode of sender'
            }),
            new ListObject({
              technicalName: 'postBoxSender',
              displayName: 'POBOX_SENDER',
              description: 'Postbox of sender'
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
              technicalName: 'bankBIC',
              displayName: 'BANK_BIC',
              description: 'BIC of bank account'
            }),
            new ListObject({
              technicalName: 'bankIBAN',
              displayName: 'BANK_IBAN',
              description: 'IBAN of bank account'
            }),
            new ListObject({
              technicalName: 'bankCodeNumber',
              displayName: 'BANK_BCNO',
              description: 'Bank code number'
            }),
            new ListObject({
              technicalName: 'bankAccountNumber',
              displayName: 'BANK_BANO',
              description: 'Bank account number'
            }),
            new ListObject({
              technicalName: 'accountHolder',
              displayName: 'ACCOUNT_HOLDER',
              description: 'Account holder'
            })
          ]
    }),
    new ISASTable({
      technicalName: 'RemittanceAdvicePosition',
      displayName: 'REMADV_POSITION',
      type: 'REMITTANCE_ADVICE',
      description: 'Remittance advice position information',
      isasFields:
          [
            new ListObject({
              technicalName: 'invoiceReference1',
              displayName: 'INVOICE_REF_1',
              description: 'Invoice reference #1'
            }),
            new ListObject({
              technicalName: 'invoiceReference2',
              displayName: 'INVOICE_REF_2',
              description: 'Invoice reference #2'
            }),
            new ListObject({
              technicalName: 'invoiceReference3',
              displayName: 'INVOICE_REF_3',
              description: 'Invoice reference #3'
            }),
            new ListObject({
              technicalName: 'invoiceReference4',
              displayName: 'INVOICE_REF_4',
              description: 'Invoice reference #4'
            }),
            new ListObject({
              technicalName: 'invoiceReference5',
              displayName: 'INVOICE_REF_5',
              description: 'Invoice reference #5'
            }),
            new ListObject({
              technicalName: 'invoiceReference6',
              displayName: 'INVOICE_REF_6',
              description: 'Invoice reference #6'
            }),
            new ListObject({
              technicalName: 'invoiceReference7',
              displayName: 'INVOICE_REF_7',
              description: 'Invoice reference #7'
            }),
            new ListObject({
              technicalName: 'invoiceDate',
              displayName: 'INVOICE_DATE',
              description: 'Invoice date'
            }),
            new ListObject({
              technicalName: 'paymentCurrency',
              displayName: 'PAYM_CURR',
              description: 'Payment Currency-Module'
            }),
            new ListObject({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR',
              description: 'Credit/Debit indicator (CRDT/DBIT)'
            }),
            new ListObject({
              technicalName: 'paymentAmount',
              displayName: 'PAYM_AMOUNT',
              description: 'Payment amount'
            })
          ]
    }),
    new ISASTable({
      technicalName: 'RemittanceAdviceUnstructuredLine',
      displayName: 'REMADV_UNSTRUCTLINE',
      type: 'REMITTANCE_ADVICE',
      description: 'Remittance advice unsctructured information',
      isasFields:
          [
            new ListObject({
              technicalName: 'referenceNumber',
              displayName: 'RUL_ID',
              description: 'Unstructured information reference'
            }),
            new ListObject({
              technicalName: 'line',
              displayName: 'RUL_INFO',
              description: 'Unstructured information'
            })
          ]
    }),
    new ISASTable({
      technicalName: 'RemittanceAdviceAmount',
      displayName: 'REMADV_AMOUNT',
      type: 'REMITTANCE_ADVICE',
      description: 'Remittance advice amount information',
      isasFields:
          [
            new ListObject({
              technicalName: 'amountType',
              displayName: 'AMT_TYPE',
              description: 'Internal amount type'
            }),
            new ListObject({
              technicalName: 'amountTypeExternal',
              displayName: 'AMT_TYPE_EXT',
              description: 'External amount type'
            }),
            new ListObject({
              technicalName: 'amountCurrency',
              displayName: 'AMT_CURR',
              description: 'Amount Currency'
            }),
            new ListObject({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR',
              description: 'Credit/Debit indicator (CRDT/DBIT)'
            }),
            new ListObject({
              technicalName: 'amount',
              displayName: 'AMOUNT',
              description: 'Amount'
            }),
            new ListObject({
              technicalName: 'validated',
              displayName: 'VALIDATED',
              description: 'Amount checked against OI'
            })
          ]
    })
  ];
}
