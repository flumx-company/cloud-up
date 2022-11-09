import {ReferenceField} from './reference-field';
import {ReferenceFieldSearchType} from './reference-field-search-type';

export class ReferenceFields {
  fields = [
    new ReferenceField('Reference', ReferenceFieldSearchType.equals),
    new ReferenceField('Reference key', ReferenceFieldSearchType.contains),
    new ReferenceField('Tax number 1', ReferenceFieldSearchType.equals),
    new ReferenceField('Tax number 2', ReferenceFieldSearchType.equals),
    new ReferenceField(
        'Vat registration number', ReferenceFieldSearchType.equals),
    new ReferenceField('Old customer id', ReferenceFieldSearchType.equals),
    new ReferenceField('Buying group', ReferenceFieldSearchType.equals),
    new ReferenceField('Payment reference', ReferenceFieldSearchType.equals),
    new ReferenceField('Assignment', ReferenceFieldSearchType.equals),
    new ReferenceField('Invoice list number', ReferenceFieldSearchType.equals),
    new ReferenceField('Reference 1', ReferenceFieldSearchType.equals),
    new ReferenceField('Reference 2', ReferenceFieldSearchType.equals),
    new ReferenceField('Reference 3', ReferenceFieldSearchType.equals),
    new ReferenceField('Order number', ReferenceFieldSearchType.equals),
    new ReferenceField('Contract', ReferenceFieldSearchType.equals),
    new ReferenceField('Contract type', ReferenceFieldSearchType.equals),
    new ReferenceField('Invoice list number', ReferenceFieldSearchType.equals),
    new ReferenceField(
        'Branch account number', ReferenceFieldSearchType.equals),
    new ReferenceField(
        'Document header text', ReferenceFieldSearchType.contains),
    new ReferenceField(
        'Document header reference 1', ReferenceFieldSearchType.equals),
    new ReferenceField(
        'Document header reference 2', ReferenceFieldSearchType.equals),
    new ReferenceField('Sale document number', ReferenceFieldSearchType.equals),
    new ReferenceField(
        'Document number invoice reference', ReferenceFieldSearchType.equals),
    new ReferenceField('Position text', ReferenceFieldSearchType.contains)
  ];
}
