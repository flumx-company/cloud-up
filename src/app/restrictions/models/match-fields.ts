import {MatchField} from './match-field';
import {MatchTable} from './match-table';

export class MatchFields {
  static readonly matchTableList = [
    new MatchTable({technicalName: '', displayName: '', matchFields: []}),
    new MatchTable({
      technicalName: 'BankStatementHeader',
      displayName: 'BANKSTMT_HEADER',
      matchFields:
          [
            new MatchField({technicalName: 'id', displayName: 'ID'}),
            new MatchField({technicalName: 'origin', displayName: 'ORIGIN'}),
            new MatchField(
                {technicalName: 'originGroup', displayName: 'ORIGIN_GROUP'}),
            new MatchField(
                {technicalName: 'formatOrigin', displayName: 'FORMAT_ORIGIN'}),
            new MatchField(
                {technicalName: 'accountType', displayName: 'ACCT_TYPE'}),
            new MatchField({technicalName: 'bankBIC', displayName: 'BANK_BIC'}),
            new MatchField(
                {technicalName: 'bankIBAN', displayName: 'BANK_IBAN'}),
            new MatchField(
                {technicalName: 'bankCodeNumber', displayName: 'BANK_BCNO'}),
            new MatchField(
                {technicalName: 'bankAccountNumber', displayName: 'BANK_BANO'}),
            new MatchField(
                {technicalName: 'sequenceNumber', displayName: 'SEQNO'}),
            new MatchField(
                {technicalName: 'createDate', displayName: 'CREATE_DATE'}),
            new MatchField(
                {technicalName: 'createTime', displayName: 'CREATE_TIME'}),
            new MatchField({
              technicalName: 'accountCurrency',
              displayName: 'ACCT_CURR'
            })
          ]
    }),
    new MatchTable({
      technicalName: 'BankStatementPosition',
      displayName: 'BANKSTMT_POSITION',
      matchFields:
          [
            new MatchField(
                {technicalName: 'bankPostdate', displayName: 'BANK_POSTDATE'}),
            new MatchField({
              technicalName: 'documentPostdate',
              displayName: 'DOC_POSTDATE'
            }),
            new MatchField(
                {technicalName: 'valueDate', displayName: 'VALUE_DATE'}),
            new MatchField(
                {technicalName: 'paymentCurrency', displayName: 'PAYM_CURR'}),
            new MatchField({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR'
            }),
            new MatchField(
                {technicalName: 'paymentAmount', displayName: 'PAYM_AMOUNT'}),
            new MatchField({
              technicalName: 'externalBusinessTransactionCode',
              displayName: 'EXT_BUSINESS_TA'
            }),
            new MatchField({technicalName: 'textkey', displayName: 'TEXTKEY'}),
            new MatchField({
              technicalName: 'bankPostingtext',
              displayName: 'BANK_POSTINGTXT'
            }),
            new MatchField({
              technicalName: 'partnerBankCountryCode',
              displayName: 'PA_BANKCOUNTRYCODE'
            }),
            new MatchField({
              technicalName: 'partnerBankCodeNumber',
              displayName: 'PA_BANKCODENO'
            }),
            new MatchField(
                {technicalName: 'partnerBIC', displayName: 'PA_BIC'}),
            new MatchField({
              technicalName: 'partnerBankAccountNumber',
              displayName: 'PA_BANKACCTNO'
            }),
            new MatchField(
                {technicalName: 'partnerName', displayName: 'PA_NAME'}),
            new MatchField(
                {technicalName: 'partnerIBAN', displayName: 'PA_IBAN'}),
            new MatchField(
                {technicalName: 'daybookNumber', displayName: 'DAYBOOKNO'}),
            new MatchField(
                {technicalName: 'checkNumber', displayName: 'CHECKNO'}),
            new MatchField({technicalName: 'avisId', displayName: 'AVISID'}),
            new MatchField({
              technicalName: 'bankReference',
              displayName: 'BANK_REFERENCE'
            }),
            new MatchField({
              technicalName: 'paymentReference',
              displayName: 'PAYM_REFERENCE'
            }),
            new MatchField(
                {technicalName: 'c2cReference', displayName: 'C2C_REFERENCE'}),
            new MatchField({
              technicalName: 'c2cReference2',
              displayName: 'C2C_REFERENCE2'
            }),
            new MatchField({
              technicalName: 'c2cCustomerReference',
              displayName: 'C2C_KREF'
            }),
            new MatchField({
              technicalName: 'c2cMandateReference',
              displayName: 'C2C_MREF'
            })
          ]
    }),
    new MatchTable({
      technicalName: 'BankStatementAmount',
      displayName: 'BANKSTMT_AMOUNT',
      matchFields:
          [
            new MatchField(
                {technicalName: 'amountType', displayName: 'AMT_TYPE'}),
            new MatchField({
              technicalName: 'amountTypeExternal',
              displayName: 'AMT_TYPE_EXT'
            }),
            new MatchField(
                {technicalName: 'amountCurrency', displayName: 'AMT_CURR'}),
            new MatchField({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR'
            }),
            new MatchField({technicalName: 'amount', displayName: 'AMOUNT'}),
            new MatchField({technicalName: 'fxrate', displayName: 'FXRATE'}),
            new MatchField(
                {technicalName: 'validated', displayName: 'VALIDATED'})
          ]
    }),
    new MatchTable({
      technicalName: 'BankStatementNTP',
      displayName: 'BANKSTMT_NTP',
      matchFields:
          [
            new MatchField(
                {technicalName: 'noteToPayeeId', displayName: 'NTP_ID'}),
            new MatchField(
                {technicalName: 'noteToPayee', displayName: 'NTP'})
          ]
    }),
    new MatchTable({
      technicalName: 'RemittanceAdviceHeader',
      displayName: 'REMADV_HEADER',
      matchFields:
          [
            new MatchField({
              technicalName: 'remittanceAdviceId',
              displayName: 'REMADV_ID'
            }),
            new MatchField({
              technicalName: 'remittanceAdviceExternalId',
              displayName: 'REMADV_IDEXT'
            }),
            new MatchField({technicalName: 'payer', displayName: 'PAYER'}),
            new MatchField({
              technicalName: 'alternatePayer',
              displayName: 'ALTERNATE_PAYER'
            }),
            new MatchField({
              technicalName: 'remittanceAdviceSender',
              displayName: 'REMADV_SENDER'
            }),
            new MatchField({
              technicalName: 'remittanceAdviceReceiver',
              displayName: 'REMADV_RECEIVER'
            }),
            new MatchField(
                {technicalName: 'settlementDate', displayName: 'SETTLM_DATE'}),
            new MatchField({
              technicalName: 'remittanceAdviceReference1',
              displayName: 'REMADV_REF_1'
            }),
            new MatchField({
              technicalName: 'remittanceAdviceReference2',
              displayName: 'REMADV_REF_2'
            }),
            new MatchField({
              technicalName: 'remittanceAdviceReference3',
              displayName: 'REMADV_REF_3'
            }),
            new MatchField({
              technicalName: 'remittanceAdviceReference4',
              displayName: 'REMADV_REF_4'
            }),
            new MatchField({
              technicalName: 'remittanceAdviceReference5',
              displayName: 'REMADV_REF_5'
            }),
            new MatchField({
              technicalName: 'remittanceAdviceReference6',
              displayName: 'REMADV_REF_6'
            }),
            new MatchField({
              technicalName: 'remittanceAdviceReference7',
              displayName: 'REMADV_REF_7'
            }),
            new MatchField(
                {technicalName: 'paymentCurrency', displayName: 'PAYM_CURR'}),
            new MatchField({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR'
            }),
            new MatchField(
                {technicalName: 'paymentAmount', displayName: 'PAYM_AMOUNT'}),
            new MatchField({technicalName: 'archiveId', displayName: 'ARC_ID'}),
            new MatchField(
                {technicalName: 'emailSender', displayName: 'EMAIL_SENDER'}),
            new MatchField({
              technicalName: 'emailReceiver',
              displayName: 'EMAIL_RECEIVER'
            }),
            new MatchField(
                {technicalName: 'paymentDate', displayName: 'PAYM_DATE'}),
            new MatchField(
                {technicalName: 'emailSubject', displayName: 'EMAIL_SUBJECT'}),
            new MatchField(
                {technicalName: 'filename', displayName: 'FILENAME'}),
            new MatchField(
                {technicalName: 'createDate', displayName: 'CREATE_DATE'}),
            new MatchField(
                {technicalName: 'createTime', displayName: 'CREATE_TIME'}),
            new MatchField({
              technicalName: 'customerAccount',
              displayName: 'CUST_ACCOUNT'
            }),
            new MatchField(
                {technicalName: 'name1Sender', displayName: 'NAME1_SENDER'}),
            new MatchField(
                {technicalName: 'name2Sender', displayName: 'NAME2_SENDER'}),
            new MatchField(
                {technicalName: 'streetSender', displayName: 'STREET_SENDER'}),
            new MatchField(
                {technicalName: 'citySender', displayName: 'CITY_SENDER'}),
            new MatchField({
              technicalName: 'postCodeSender',
              displayName: 'POSTCODE_SENDER'
            }),
            new MatchField(
                {technicalName: 'postBoxSender', displayName: 'POBOX_SENDER'}),
            new MatchField({
              technicalName: 'telephoneNumberSender',
              displayName: 'TELNO_SENDER'
            }),
            new MatchField(
                {technicalName: 'faxSender', displayName: 'FAX_SENDER'}),
            new MatchField({
              technicalName: 'taxNumberSender',
              displayName: 'TAXNO_SENDER'
            }),
            new MatchField({
              technicalName: 'salesTaxNumberSender',
              displayName: 'SALESTAXNO_SENDER'
            }),
            new MatchField({
              technicalName: 'traderegisterNumberSender',
              displayName: 'TRADEREGISTERNO_SENDER'
            }),
            new MatchField({technicalName: 'bankBIC', displayName: 'BANK_BIC'}),
            new MatchField(
                {technicalName: 'bankIBAN', displayName: 'BANK_IBAN'}),
            new MatchField(
                {technicalName: 'bankCodeNumber', displayName: 'BANK_BCNO'}),
            new MatchField(
                {technicalName: 'bankAccountNumber', displayName: 'BANK_BANO'}),
            new MatchField({
              technicalName: 'accountHolder',
              displayName: 'ACCOUNT_HOLDER'
            })
          ]
    }),
    new MatchTable({
      technicalName: 'RemittanceAdvicePosition',
      displayName: 'REMADV_POSITION',
      matchFields:
          [
            new MatchField({
              technicalName: 'invoiceReference1',
              displayName: 'INVOICE_REF_1'
            }),
            new MatchField({
              technicalName: 'invoiceReference2',
              displayName: 'INVOICE_REF_2'
            }),
            new MatchField({
              technicalName: 'invoiceReference3',
              displayName: 'INVOICE_REF_3'
            }),
            new MatchField({
              technicalName: 'invoiceReference4',
              displayName: 'INVOICE_REF_4'
            }),
            new MatchField({
              technicalName: 'invoiceReference5',
              displayName: 'INVOICE_REF_5'
            }),
            new MatchField({
              technicalName: 'invoiceReference6',
              displayName: 'INVOICE_REF_6'
            }),
            new MatchField({
              technicalName: 'invoiceReference7',
              displayName: 'INVOICE_REF_7'
            }),
            new MatchField(
                {technicalName: 'invoiceDate', displayName: 'INVOICE_DATE'}),
            new MatchField(
                {technicalName: 'paymentCurrency', displayName: 'PAYM_CURR'}),
            new MatchField({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR'
            }),
            new MatchField(
                {technicalName: 'paymentAmount', displayName: 'PAYM_AMOUNT'}),
            new MatchField({
              technicalName: 'internalReferenceAccountingSystem',
              displayName: 'IREF_OPACCSYS'
            }),
            new MatchField({
              technicalName: 'internalReferenceOpenItem',
              displayName: 'IREF_OPREF'
            }),
            new MatchField({
              technicalName: 'internalReference1XPosition',
              displayName: 'IREF1_X'
            }),
            new MatchField({
              technicalName: 'internalReference1YPosition',
              displayName: 'IREF1_Y'
            }),
            new MatchField({
              technicalName: 'internalReference1OpenItemField',
              displayName: 'IREF1_OPFELD'
            }),
            new MatchField({
              technicalName: 'internalReference2XPosition',
              displayName: 'IREF2_X'
            }),
            new MatchField({
              technicalName: 'internalReference2YPosition',
              displayName: 'IREF2_Y'
            }),
            new MatchField({
              technicalName: 'internalReference2OpenItemField',
              displayName: 'IREF2_OPFELD'
            }),
            new MatchField({
              technicalName: 'internalReference3XPosition',
              displayName: 'IREF3_X'
            }),
            new MatchField({
              technicalName: 'internalReference3YPosition',
              displayName: 'IREF3_Y'
            }),
            new MatchField({
              technicalName: 'internalReference3OpenItemField',
              displayName: 'IREF3_OPFELD'
            }),
            new MatchField({
              technicalName: 'internalReference4XPosition',
              displayName: 'IREF4_X'
            }),
            new MatchField({
              technicalName: 'internalReference4YPosition',
              displayName: 'IREF4_Y'
            }),
            new MatchField({
              technicalName: 'internalReference4OpenItemField',
              displayName: 'IREF4_OPFELD'
            }),
            new MatchField({
              technicalName: 'internalReference5XPosition',
              displayName: 'IREF5_X'
            }),
            new MatchField({
              technicalName: 'internalReference5YPosition',
              displayName: 'IREF5_Y'
            }),
            new MatchField({
              technicalName: 'internalReference5OpenItemField',
              displayName: 'IREF5_OPFELD'
            }),
            new MatchField({
              technicalName: 'internalReference6XPosition',
              displayName: 'IREF6_X'
            }),
            new MatchField({
              technicalName: 'internalReference6YPosition',
              displayName: 'IREF6_Y'
            }),
            new MatchField({
              technicalName: 'internalReference6OpenItemField',
              displayName: 'IREF6_OPFELD'
            }),
            new MatchField({
              technicalName: 'internalReference7XPosition',
              displayName: 'IREF7_X'
            }),
            new MatchField({
              technicalName: 'internalReference7YPosition',
              displayName: 'IREF7_Y'
            }),
            new MatchField({
              technicalName: 'internalReference7OpenItemField',
              displayName: 'IREF7_OPFELD'
            })
          ]
    }),
    new MatchTable({
      technicalName: 'RemittanceAdviceUnstructuredLine',
      displayName: 'REMADV_UNSTRUCTLINE',
      matchFields:
          [
            new MatchField(
                {technicalName: 'referenceNumber', displayName: 'RUL_ID'}),
            new MatchField({technicalName: 'line', displayName: 'RUL_INFO'})
          ]
    }),
    new MatchTable({
      technicalName: 'RemittanceAdviceAmount',
      displayName: 'REMADV_AMOUNT',
      matchFields:
          [
            new MatchField(
                {technicalName: 'amountType', displayName: 'AMT_TYPE'}),
            new MatchField({
              technicalName: 'amountTypeExternal',
              displayName: 'AMT_TYPE_EXT'
            }),
            new MatchField(
                {technicalName: 'amountCurrency', displayName: 'AMT_CURR'}),
            new MatchField({
              technicalName: 'creditDebitIndicator',
              displayName: 'CDTDBT_INDICATOR'
            }),
            new MatchField({technicalName: 'amount', displayName: 'AMOUNT'}),
            new MatchField(
                {technicalName: 'validated', displayName: 'VALIDATED'})
          ]
    })
  ];
}
