import {ListObject} from './list-object';

export class OperatorList {
    static readonly list = [
        new ListObject({technicalName: '$eq', displayName: '='}),
        new ListObject({technicalName: '$ne', displayName: '≠'}),
        new ListObject({technicalName: '$gt', displayName: '>'}),
        new ListObject({technicalName: '$lt', displayName: '<'}),
        new ListObject({technicalName: '$gte', displayName: '≥'}),
        new ListObject({technicalName: '$lte', displayName: '≤'}),
        // new ListObject({technicalName: 'BETWEEN_INCLUDING', displayName: '≤≥'}),
        // new ListObject({technicalName: 'BETWEEN_EXCLUDING', displayName: '<>'})
    ]
    static readonly operators = ['$eq', '$gt', '$gte', '$in', '$lt', '$lte', '$ne', '$nin'];
    static readonly operation = [
        new ListObject({technicalName: '$and', displayName: 'AND'}),
        new ListObject({technicalName: '$not', displayName: 'NOT'}),
        new ListObject({technicalName: '$nor', displayName: 'NOR'}),
        new ListObject({technicalName: '$or',  displayName: 'OR'}),
    ];
}
