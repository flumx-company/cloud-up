
export class FormatDetailList {

    static readonly listItem = [
        'HEADER',
        'ITEMS'
    ];

    static readonly listTab= [
        'PO',
        'GL',
        'PO+GL'
    ];

    static readonly listType= [
        'Date',
        'String',
        'Line_Breack',
        'Number',
        'Amount'
    ];

    static readonly listDeleteAction= [
        'id',
        'key',
        'readonly',
        'tab',
        'HEADER',
        'ITEMS',
        'visible',
        'LABEL',
        'TOOLTIP',
        'DETAIL',
        'change'
    ];

    static readonly listWordAction = [
        { value:'C', name:'Create'   },
        { value:'U', name: 'Update'  },
        { value:'A', name: 'Approve' }
    ];

}
