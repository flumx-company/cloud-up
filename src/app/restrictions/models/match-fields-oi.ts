import {MatchFieldOI} from './match-field-oi';

export class MatchFieldsOI {
  static readonly list = [
    new MatchFieldOI({
      displayName: 'ACCOUNTING_SYSTEM_ID',
      technicalName: 'accountingSystemId'
    }),
    new MatchFieldOI({displayName: 'SYS_ID', technicalName: 'systemId'}),
    new MatchFieldOI({displayName: 'CLIENT_ID', technicalName: 'clientId'}),
    new MatchFieldOI({displayName: 'COMPANY_ID', technicalName: 'companyId'}),
    new MatchFieldOI({displayName: 'BUS_AREA', technicalName: 'businessArea'}),
    new MatchFieldOI({displayName: 'FISC_YEAR', technicalName: 'fiscalYear'}),
    new MatchFieldOI({displayName: 'DOC_NUM', technicalName: 'documentNumber'}),
    new MatchFieldOI({displayName: 'LINE_ITEM', technicalName: 'lineItem'}),
    new MatchFieldOI({displayName: 'ACC_TYPE', technicalName: 'accountType'}),
    new MatchFieldOI({displayName: 'ACCOUNT', technicalName: 'account'}),
    new MatchFieldOI({displayName: 'NAME', technicalName: 'name'}),
    new MatchFieldOI({displayName: 'TAX_NUM_1', technicalName: 'taxNumber1'}),
    new MatchFieldOI({displayName: 'TAX_NUM_2', technicalName: 'taxNumber2'}),
    new MatchFieldOI(
        {displayName: 'VAT_REG_NUM', technicalName: 'vatRegistrationNumber'}),
    new MatchFieldOI(
        {displayName: 'CUSTOMER_ID_OLD', technicalName: 'customerIdOld'}),
    new MatchFieldOI(
        {displayName: 'BUYING_GROUP', technicalName: 'buyingGroup'}),
    new MatchFieldOI({displayName: 'DOC_DATE', technicalName: 'documentDate'}),
    new MatchFieldOI({displayName: 'POST_DATE', technicalName: 'postingDate'}),
    new MatchFieldOI(
        {displayName: 'POSTPERIOD', technicalName: 'postingPeriod'}),
    new MatchFieldOI({displayName: 'REFERENCE', technicalName: 'reference'}),
    new MatchFieldOI({displayName: 'REF_KEY', technicalName: 'referenceKey'}),
    new MatchFieldOI(
        {displayName: 'LEDGER_GROUP', technicalName: 'ledgerGroup'}),
    new MatchFieldOI({displayName: 'LEDGER', technicalName: 'ledger'}),
    new MatchFieldOI(
        {displayName: 'DOC_CURR', technicalName: 'documentCurrency'}),
    new MatchFieldOI({displayName: 'LOC_CURR', technicalName: 'localCurrency'}),
    new MatchFieldOI({displayName: 'RATE', technicalName: 'rate'}),
    new MatchFieldOI(
        {displayName: 'DOC_HEADER_TEXT', technicalName: 'documentHeaderText'}),
    new MatchFieldOI({
      displayName: 'DOC_HEADER_REF_1',
      technicalName: 'documentHeaderReference1'
    }),
    new MatchFieldOI({
      displayName: 'DOC_HEADER_REF_2',
      technicalName: 'documentHeaderReference2'
    }),
    new MatchFieldOI(
        {displayName: 'DOC_AMOUNT', technicalName: 'documentAmount'}),
    new MatchFieldOI({
      displayName: 'DOC_AMT_ELI_CD',
      technicalName: 'documentAmountEligibleCashDiscount'
    }),
    new MatchFieldOI({
      displayName: 'DOC_AMT_CASHDISC',
      technicalName: 'documentAmountCashDiscount'
    }),
    new MatchFieldOI({displayName: 'LOC_AMOUNT', technicalName: 'localAmount'}),
    new MatchFieldOI(
        {displayName: 'BLINE_DATE', technicalName: 'baselineDate'}),
    new MatchFieldOI(
        {displayName: 'CASHDISC_DAYS_1', technicalName: 'cashDiscountDays1'}),
    new MatchFieldOI({
      displayName: 'CASHDISC_PERC_1',
      technicalName: 'cashDiscountPercent1'
    }),
    new MatchFieldOI(
        {displayName: 'CASHDISC_DAYS_2', technicalName: 'cashDiscountDays2'}),
    new MatchFieldOI({
      displayName: 'CASHDISC_PERC_2',
      technicalName: 'cashDiscountPercent2'
    }),
    new MatchFieldOI(
        {displayName: 'CASHDISC_DAYS_3', technicalName: 'cashDiscountDays3'}),
    new MatchFieldOI({
      displayName: 'CASHDISC_PERC_3',
      technicalName: 'cashDiscountPercent3'
    }),
    new MatchFieldOI(
        {displayName: 'NETPAYM_DATE', technicalName: 'netPaymentDate'}),
    new MatchFieldOI(
        {displayName: 'FIXED_PAYM_TERMS', technicalName: 'fixedPaymentTerms'}),
    new MatchFieldOI(
        {displayName: 'PAYM_BLOCK', technicalName: 'paymentBlock'}),
    new MatchFieldOI({displayName: 'TAX_CODE', technicalName: 'taxCode'}),
    new MatchFieldOI({displayName: 'POSTING_KEY', technicalName: 'postingKey'}),
    new MatchFieldOI(
        {displayName: 'SPEC_GLINDICATOR', technicalName: 'specialGlIndicator'}),
    new MatchFieldOI({displayName: 'PSP_ELEMENT', technicalName: 'pspElement'}),
    new MatchFieldOI(
        {displayName: 'PROFIT_CENTER', technicalName: 'profitCenter'}),
    new MatchFieldOI({displayName: 'COST_CENTER', technicalName: 'costCenter'}),
    new MatchFieldOI(
        {displayName: 'PAYM_REFERENCE', technicalName: 'paymentReference'}),
    new MatchFieldOI({displayName: 'ASSIGNMENT', technicalName: 'assignment'}),
    new MatchFieldOI(
        {displayName: 'BILLING_DOC', technicalName: 'billingDocument'}),
    new MatchFieldOI({displayName: 'REF_1', technicalName: 'reference1'}),
    new MatchFieldOI({displayName: 'REF_2', technicalName: 'reference2'}),
    new MatchFieldOI({displayName: 'REF_3', technicalName: 'reference3'}),
    new MatchFieldOI({displayName: 'ORDER_NO', technicalName: 'orderNumber'}),
    new MatchFieldOI({displayName: 'CONTRACT', technicalName: 'contract'}),
    new MatchFieldOI(
        {displayName: 'CONTRACT_TYPE', technicalName: 'contractType'}),
    new MatchFieldOI(
        {displayName: 'INV_LISTNO', technicalName: 'invoiceListNumber'}),
    new MatchFieldOI(
        {displayName: 'BRANCH_ACCNO', technicalName: 'branchAccountNumber'}),
    new MatchFieldOI(
        {displayName: 'SALE_DOC_NUM', technicalName: 'saleDocumentNumber'}),
    new MatchFieldOI({
      displayName: 'DOC_NUM_INVREF',
      technicalName: 'documentNumberInvoiceReference'
    }),
    new MatchFieldOI({displayName: 'POS_TEXT', technicalName: 'positionText'})
  ];
}
