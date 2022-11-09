import {ListObject} from './list-object';
import {OpenItemField} from './open-item-field';

export class OpenItemFieldList {
  static readonly list = [
    new OpenItemField({
      displayName: 'ACCOUNTING_SYSTEM_ID',
      technicalName: 'accountingSystemId',
      description: 'Accounting system identifier'
    }),
    new OpenItemField({
      displayName: 'SYS_ID',
      technicalName: 'systemId',
      description: 'System identifier'
    }),
    new OpenItemField({
      displayName: 'CLIENT_ID',
      technicalName: 'clientId',
      description: 'Client identifier'
    }),
    new OpenItemField({
      displayName: 'COMPANY_ID',
      technicalName: 'companyId',
      description: 'Company identifier'
    }),
    new OpenItemField({
      displayName: 'BUS_AREA',
      technicalName: 'businessArea',
      description: 'Business area'
    }),
    new OpenItemField({
      displayName: 'FISC_YEAR',
      technicalName: 'fiscalYear',
      description: 'Fiscal year'
    }),
    new OpenItemField({
      displayName: 'DOC_NUM',
      technicalName: 'documentNumber',
      description: 'Document number'
    }),
    new OpenItemField({
      displayName: 'LINE_ITEM',
      technicalName: 'lineItem',
      description: 'Line Item'
    }),
    new OpenItemField({
      displayName: 'ACC_TYPE',
      technicalName: 'accountType',
      description: 'Account type'
    }),
    new OpenItemField({
      displayName: 'ACCOUNT',
      technicalName: 'account',
      description: 'Account'
    }),
    new OpenItemField({
      displayName: 'NAME',
      technicalName: 'name',
      description: 'Account name'
    }),
    new OpenItemField({
      displayName: 'TAX_NUM_1',
      technicalName: 'taxNumber1',
      description: 'Tax number 1'
    }),
    new OpenItemField({
      displayName: 'TAX_NUM_2',
      technicalName: 'taxNumber2',
      description: 'Tax number 2'
    }),
    new OpenItemField({
      displayName: 'VAT_REG_NUM',
      technicalName: 'vatRegistrationNumber',
      description: 'VAT registration number'
    }),
    new OpenItemField({
      displayName: 'CUSTOMER_ID_OLD',
      technicalName: 'customerIdOld',
      description: 'Old customer identifier'
    }),
    new OpenItemField({
      displayName: 'BUYING_GROUP',
      technicalName: 'buyingGroup',
      description: 'Buying group'
    }),
    new OpenItemField({
      displayName: 'DOC_DATE',
      technicalName: 'documentDate',
      isDateField: true,
      description: 'Document date'
    }),
    new OpenItemField({
      displayName: 'POST_DATE',
      technicalName: 'postingDate',
      isDateField: true,
      description: 'Posting date'
    }),
    new OpenItemField({
      displayName: 'POSTPERIOD',
      technicalName: 'postingPeriod',
      description: 'Posting period'
    }),
    new OpenItemField({
      displayName: 'REFERENCE',
      technicalName: 'reference',
      description: 'Reference'
    }),
    new OpenItemField({
      displayName: 'REFERENCE_KEY',
      technicalName: 'referenceKey',
      description: 'Reference key'
    }),
    new OpenItemField({
      displayName: 'LEDGER_GROUP',
      technicalName: 'ledgerGroup',
      description: 'Ledger group'
    }),
    new OpenItemField({
      displayName: 'LEDGER',
      technicalName: 'ledger',
      description: 'Ledger'
    }),
    new OpenItemField({
      displayName: 'DOC_CURR',
      technicalName: 'documentCurrency',
      description: 'Document Currency-Module'
    }),
    new OpenItemField({
      displayName: 'LOC_CURR',
      technicalName: 'localCurrency',
      description: 'Local Currency-Module'
    }),
    new OpenItemField(
        {displayName: 'RATE', technicalName: 'rate', description: 'Rate'}),
    new OpenItemField({
      displayName: 'DOC_HEADER_TEXT',
      technicalName: 'documentHeaderText',
      description: 'Document header text'
    }),
    new OpenItemField({
      displayName: 'DOC_HEADER_REF_1',
      technicalName: 'documentHeaderReference1',
      description: 'Document header reference 1'
    }),
    new OpenItemField({
      displayName: 'DOC_HEADER_RER_2',
      technicalName: 'documentHeaderReference2',
      description: 'Document header reference 2'
    }),
    new OpenItemField({
      displayName: 'DOC_AMOUNT',
      technicalName: 'documentAmount',
      description: 'Document Amount'
    }),
    new OpenItemField({
      displayName: 'DOC_AMT_ELI_CD',
      technicalName: 'documentAmountEligibleCashDiscount',
      description: 'Document amount eligible cash discount'
    }),
    new OpenItemField({
      displayName: 'DOC_AMT_CASHDISC',
      technicalName: 'documentAmountCashDiscount',
      description: 'Document amount cash discount'
    }),
    new OpenItemField({
      displayName: 'LOC_AMOUNT',
      technicalName: 'localAmount',
      description: 'Local amount'
    }),
    new OpenItemField({
      displayName: 'LOC_DOC_AMT_ELI_CD',
      technicalName: 'localAmountEligibleCashDiscount',
      description: 'Local amount eligible cash discount'
    }),
    new OpenItemField({
      displayName: 'LOC_DOC_AMT_CD',
      technicalName: 'localAmountCashDiscount',
      description: 'Local amount cash discount'
    }),
    new OpenItemField({
      displayName: 'BASE_LINE_DATE',
      technicalName: 'baselineDate',
      description: 'Base line date'
    }),
    new OpenItemField({
      displayName: 'CASH_DISC_DAYS_1',
      technicalName: 'cashDiscountDays1',
      description: 'Cash discount days 1'
    }),
    new OpenItemField({
      displayName: 'CASH_DISC_PERC_1',
      technicalName: 'cashDiscountPercent1',
      description: 'Cash discount percent 1'
    }),
    new OpenItemField({
      displayName: 'CASH_DISC_DAYS_2',
      technicalName: 'cashDiscountDays2',
      description: 'Cash discount days 2'
    }),
    new OpenItemField({
      displayName: 'CASH_DISC_PERC_2',
      technicalName: 'cashDiscountPercent2',
      description: 'Cash discount percent 2'
    }),
    new OpenItemField({
      displayName: 'CASH_DISC_DAYS_3',
      technicalName: 'cashDiscountDays3',
      description: 'Cash discount days 3'
    }),
    new OpenItemField({
      displayName: 'NETPAYM_DATE',
      technicalName: 'netPaymentDate',
      isDateField: true,
      description: 'Net payment date'
    }),
    new OpenItemField({
      displayName: 'FIXED_PAYM_TERMS',
      technicalName: 'fixedPaymentTerms',
      description: 'Fixed payment terms'
    }),
    new OpenItemField({
      displayName: 'SHKZG',
      technicalName: 'isCredit',
      description: 'Is-credit indicator (true/false)'
    }),
    new OpenItemField({
      displayName: 'PAYM_BLOCK',
      technicalName: 'paymentBlock',
      description: 'Payment block'
    }),
    new OpenItemField({
      displayName: 'TAX_CODE',
      technicalName: 'taxCode',
      description: 'Tax code'
    }),
    new OpenItemField({
      displayName: 'POSTING_KEY',
      technicalName: 'postingKey',
      description: 'Posting key'
    }),
    new OpenItemField({
      displayName: 'SPEC_GLINDICATOR',
      technicalName: 'specialGlIndicator',
      description: 'Special GL indicator'
    }),
    new OpenItemField({
      displayName: 'PSP_ELEMENT',
      technicalName: 'pspElement',
      description: 'PSP element'
    }),
    new OpenItemField({
      displayName: 'PROFIT_CENTER',
      technicalName: 'profitCenter',
      description: 'Profit center'
    }),
    new OpenItemField({
      displayName: 'COST_CENTER',
      technicalName: 'costCenter',
      description: 'Cost center'
    }),
    new OpenItemField({
      displayName: 'PAYM_REFERENCE',
      technicalName: 'paymentReference',
      description: 'Payment reference'
    }),
    new OpenItemField({
      displayName: 'ASSIGNMENT',
      technicalName: 'assignment',
      description: 'Assignment'
    }),
    new OpenItemField({
      displayName: 'BILLING_DOC',
      technicalName: 'billingDocument',
      description: 'Billing document number'
    }),
    new OpenItemField({
      displayName: 'REF_1',
      technicalName: 'reference1',
      description: 'Reference 1'
    }),
    new OpenItemField({
      displayName: 'REF_2',
      technicalName: 'reference2',
      description: 'Reference 2'
    }),
    new OpenItemField({
      displayName: 'REF_3',
      technicalName: 'reference3',
      description: 'Reference 3'
    }),
    new OpenItemField({
      displayName: 'ORDER_NO',
      technicalName: 'orderNumber',
      description: 'Order number'
    }),
    new OpenItemField({
      displayName: 'CONTRACT',
      technicalName: 'contract',
      description: 'Contract'
    }),
    new OpenItemField({
      displayName: 'CONTRACT_TYPE',
      technicalName: 'contractType',
      description: 'Contract Type'
    }),
    new OpenItemField({
      displayName: 'INV_LISTNO',
      technicalName: 'invoiceListNumber',
      description: 'Invoice list number'
    }),
    new OpenItemField({
      displayName: 'BRANCH_ACCNO',
      technicalName: 'branchAccountNumber',
      description: 'Branch account number'
    }),
    new OpenItemField({
      displayName: 'SALE_DOC_NUM',
      technicalName: 'saleDocumentNumber',
      description: 'Sales document number'
    }),
    new OpenItemField({
      displayName: 'DOC_NUM_INVREF',
      technicalName: 'documentNumberInvoiceReference',
      description: 'Document number invoice reference'
    }),
    new OpenItemField({
      displayName: 'POS_TEXT',
      technicalName: 'positionText',
      description: 'Position text'
    }),
    new OpenItemField({
      displayName: 'CPUDT',
      technicalName: 'creationDate',
      isDateField: true,
      description: 'Creation date'
    }),
    new OpenItemField({
      displayName: 'CPUTM',
      technicalName: 'creationTime',
      description: 'Creation time'
    }),
    new OpenItemField({
      displayName: 'MATCHED',
      technicalName: 'matched',
      description: 'Matched against ISAS (true/false)'
    })
  ];
}
