import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class DashboardDataService {

    constructor(protected httpClient: HttpClient) {
    }

    getData() {
        return this.httpClient.get<any>(`api/tiles-config`).toPromise();
    }

    getProcessMonitorDataLive() {

        return this.httpClient.get<any>(`api/pts?myactionlist=x`).toPromise();
    }

    getProcessMonitorData() {
        return [
            {
                '_id': '5caf6f46f273bb000f00940e',
                'HEADER': {
                    'XBLNR': 'CAP-22:18:7',
                    'XBLDT': '2019-04-08T02:18:08.291Z',
                    'WRBTR': 100,
                    'BUKRS': '1000',
                    'STATS': 'SC',
                    'XUSER': 'BOBU',
                    'RECNO': 173,
                    'Status': 'Out of Balance',
                    'Vendor Name': 'Electronic Components'
                },
                'ITEMS': [
                    {
                        'GLACC': '1000',
                        'NETWR': 100
                    }
                ],
                'TENANT_ID': 'test-tenant',
                'OBJECT': 'PTS',
                'EXCEPTIONS': [
                    {
                        'CURR': true,
                        'EVENT': 'WEB',
                        'UNAME': 'BOBU',
                        'DATETIME': '2019-04-11T16:45:58.091Z',
                        'MESSAGES': [
                            {
                                'TYPE': 'E',
                                'MSG_NUM': 100,
                                'AGENT_TYPE': 'AP',
                                'PRIORITY': 1,
                                'PARRALLEL_WF': false,
                                'V1': [
                                    'LIFNR'
                                ],
                                'LABEL': 'LIFNR is required'
                            }
                        ]
                    }
                ],
                'WORKFLOWS': [
                    {
                        'ID': 1,
                        'started-by': 'BOBU',
                        'active': true,
                        'ASSIGNEES': [
                            {
                                'SEQ': 1,
                                'EXCEPTIONS': [
                                    {
                                        'CURR': true,
                                        'EVENT': 'WEB',
                                        'UNAME': 'BOBU',
                                        'DATETIME': '2019-04-11T16:45:58.091Z',
                                        'MESSAGES': [
                                            {
                                                'TYPE': 'E',
                                                'MSG_NUM': 100,
                                                'AGENT_TYPE': 'AP',
                                                'PRIORITY': 1,
                                                'PARRALLEL_WF': false,
                                                'V1': [
                                                    'LIFNR'
                                                ],
                                                'LABEL': 'LIFNR is required'
                                            }
                                        ]
                                    }
                                ],
                                'AGENTS': [
                                    'BOBU',
                                    'VICTORIA',
                                    'VISHAL'
                                ],
                                'DECISION': '',
                                'CURR': true
                            }
                        ],
                        'HISTORY': [
                            {
                                'STATS': 100,
                                'TRDAT': 1555001158128,
                                'TRUSR': null
                            }
                        ]
                    }
                ]
            },
            {
                '_id': '5caf6f46f273bb000f00940e',
                'HEADER': {
                    'XBLNR': 'CAP-22:18:7',
                    'XBLDT': '2019-04-09T02:18:08.291Z',
                    'WRBTR': 100,
                    'BUKRS': '1000',
                    'STATS': 'CR',
                    'XUSER': 'BOBU',
                    'RECNO': 174,
                    'Status': 'Auto-Post Failed',
                    'Vendor Name': 'C.E.B. Berlin'
                },
                'ITEMS': [
                    {
                        'GLACC': '1000',
                        'NETWR': 100
                    }
                ],
                'TENANT_ID': 'test-tenant',
                'OBJECT': 'PTS',
                'EXCEPTIONS': [
                    {
                        'CURR': true,
                        'EVENT': 'WEB',
                        'UNAME': 'BOBU',
                        'DATETIME': '2019-04-11T16:45:58.091Z',
                        'MESSAGES': [
                            {
                                'TYPE': 'E',
                                'MSG_NUM': 100,
                                'AGENT_TYPE': 'AP',
                                'PRIORITY': 1,
                                'PARRALLEL_WF': false,
                                'V1': [
                                    'LIFNR'
                                ],
                                'LABEL': 'LIFNR is required'
                            }
                        ]
                    }
                ],
                'WORKFLOWS': [
                    {
                        'ID': 1,
                        'started-by': 'BOBU',
                        'active': true,
                        'ASSIGNEES': [
                            {
                                'SEQ': 1,
                                'EXCEPTIONS': [
                                    {
                                        'CURR': true,
                                        'EVENT': 'WEB',
                                        'UNAME': 'BOBU',
                                        'DATETIME': '2019-04-11T16:45:58.091Z',
                                        'MESSAGES': [
                                            {
                                                'TYPE': 'E',
                                                'MSG_NUM': 100,
                                                'AGENT_TYPE': 'AP',
                                                'PRIORITY': 1,
                                                'PARRALLEL_WF': false,
                                                'V1': [
                                                    'LIFNR'
                                                ],
                                                'LABEL': 'LIFNR is required'
                                            }
                                        ]
                                    }
                                ],
                                'AGENTS': [
                                    'BOBU',
                                    'VICTORIA',
                                    'VISHAL'
                                ],
                                'DECISION': '',
                                'CURR': true
                            }
                        ],
                        'HISTORY': [
                            {
                                'STATS': 100,
                                'TRDAT': 1555001158128,
                                'TRUSR': null
                            }
                        ]
                    }
                ]
            },
            {
                '_id': '5caf7ff8f273bb000f00940f',
                'HEADER': {
                    'XBLNR': 'CAP-22:18:7',
                    'XBLDT': '2019-04-09T02:18:08.291Z',
                    'WRBTR': 10,
                    'BUKRS': '1000',
                    'STATS': 'CR',
                    'XUSER': 'BOBU',
                    'RECNO': 175,
                    'Status': 'Invalid Company Code',
                    'Vendor Name': 'Harley-Davidson Motorcycle'
                },
                'ITEMS': [
                    {
                        'GLACC': '1000',
                        'NETWR': 100
                    }
                ],
                'TENANT_ID': 'test-tenant',
                'OBJECT': 'PTS',
                'EXCEPTIONS': [
                    {
                        'CURR': true,
                        'EVENT': 'WEB',
                        'UNAME': 'BOBU',
                        'DATETIME': '2019-04-11T17:57:12.108Z',
                        'MESSAGES': [
                            {
                                'TYPE': 'E',
                                'MSG_NUM': 100,
                                'AGENT_TYPE': 'AP',
                                'PRIORITY': 1,
                                'PARRALLEL_WF': false,
                                'V1': [
                                    'LIFNR'
                                ],
                                'LABEL': 'LIFNR is required'
                            },
                            {
                                'TYPE': 'E',
                                'MSG_NUM': 120,
                                'AGENT_TYPE': 'AP',
                                'PRIORITY': 1,
                                'PARRALLEL_WF': false,
                                'V1': [
                                    'Amount is out of balance'
                                ],
                                'LABEL': 'Out of Balance'
                            }
                        ]
                    }
                ],
                'WORKFLOWS': [
                    {
                        'ID': 1,
                        'started-by': 'BOBU',
                        'active': true,
                        'ASSIGNEES': [
                            {
                                'SEQ': 1,
                                'EXCEPTIONS': [
                                    {
                                        'CURR': true,
                                        'EVENT': 'WEB',
                                        'UNAME': 'BOBU',
                                        'DATETIME': '2019-04-11T17:57:12.108Z',
                                        'MESSAGES': [
                                            {
                                                'TYPE': 'E',
                                                'MSG_NUM': 100,
                                                'AGENT_TYPE': 'AP',
                                                'PRIORITY': 1,
                                                'PARRALLEL_WF': false,
                                                'V1': [
                                                    'LIFNR'
                                                ],
                                                'LABEL': 'LIFNR is required'
                                            },
                                            {
                                                'TYPE': 'E',
                                                'MSG_NUM': 120,
                                                'AGENT_TYPE': 'AP',
                                                'PRIORITY': 1,
                                                'PARRALLEL_WF': false,
                                                'V1': [
                                                    'Amount is out of balance'
                                                ],
                                                'LABEL': 'Out of Balance'
                                            }
                                        ]
                                    }
                                ],
                                'AGENTS': [
                                    'BOBU',
                                    'VICTORIA',
                                    'VISHAL'
                                ],
                                'DECISION': '',
                                'CURR': true
                            }
                        ],
                        'HISTORY': [
                            {
                                'STATS': 100,
                                'TRDAT': 1555005432117,
                                'TRUSR': null
                            }
                        ]
                    }
                ]
            },
            {
                '_id': '5cb070b7ab7934000f8ef384',
                'HEADER': {
                    'XBLNR': 'CAP-22:18:7',
                    'XBLDT': '2019-04-09T02:18:08.291Z',
                    'LIFNR': '1000',
                    'WRBTR': 100,
                    'BUKRS': '1000',
                    'STATS': 'EI',
                    'XUSER': 'ADMIN_TEST',
                    'RECNO': 176,
                    'Status': 'Fraud Detected',
                    'Vendor Name': 'Electronic Components'
                },
                'ITEMS': [
                    {
                        'GLACC': '1000',
                        'NETWR': 100
                    }
                ],
                'TENANT_ID': 'test-tenant',
                'OBJECT': 'PTS',
                'EXCEPTIONS': [
                    {
                        'CURR': true,
                        'EVENT': 'WEB',
                        'UNAME': 'ADMIN_TEST',
                        'DATETIME': '2019-04-12T11:04:23.369Z',
                        'MESSAGES': [
                            'Validation rules not found'
                        ]
                    }
                ],
                'WORKFLOWS': [
                    {
                        'ID': 1,
                        'started-by': 'ADMIN_TEST',
                        'active': true,
                        'ASSIGNEES': [
                            {
                                'SEQ': 1,
                                'EXCEPTIONS': [
                                    {
                                        'CURR': true,
                                        'EVENT': 'WEB',
                                        'UNAME': 'ADMIN_TEST',
                                        'DATETIME': '2019-04-12T11:04:23.369Z',
                                        'MESSAGES': [
                                            'Validation rules not found'
                                        ]
                                    }
                                ],
                                'AGENTS': [
                                    'BOBU',
                                    'VICTORIA',
                                    'VISHAL'
                                ],
                                'DECISION': '',
                                'CURR': true
                            }
                        ],
                        'HISTORY': [
                            {
                                'STATS': 100,
                                'TRDAT': 1555067063390,
                                'TRUSR': null
                            }
                        ]
                    }
                ]
            },
            {
                '_id': '5cb090cdab7934000f8ef385',
                'HEADER': {
                    'XBLNR': 'CAP-22:18:7',
                    'XBLDT': '2019-04-09T02:18:08.291Z',
                    'WRBTR': 10,
                    'BUKRS': '1000',
                    'STATS': 'EI',
                    'XUSER': 'BOBU',
                    'RECNO': 177,
                    'Status': 'Possible Duplicate',
                    'Vendor Name': 'Electronic Components'
                },
                'ITEMS': [
                    {
                        'GLACC': '1000',
                        'NETWR': 100
                    }
                ],
                'TENANT_ID': 'test-tenant',
                'OBJECT': 'PTS',
                'EXCEPTIONS': [
                    {
                        'CURR': true,
                        'EVENT': 'WEB',
                        'UNAME': 'BOBU',
                        'DATETIME': '2019-04-12T13:21:17.800Z',
                        'MESSAGES': [
                            'Validation rules not found'
                        ]
                    }
                ],
                'WORKFLOWS': [
                    {
                        'ID': 1,
                        'started-by': 'BOBU',
                        'active': true,
                        'ASSIGNEES': [
                            {
                                'SEQ': 1,
                                'EXCEPTIONS': [
                                    {
                                        'CURR': true,
                                        'EVENT': 'WEB',
                                        'UNAME': 'BOBU',
                                        'DATETIME': '2019-04-12T13:21:17.800Z',
                                        'MESSAGES': [
                                            'Validation rules not found'
                                        ]
                                    }
                                ],
                                'AGENTS': [
                                    'BOBU',
                                    'VICTORIA',
                                    'VISHAL'
                                ],
                                'DECISION': '',
                                'CURR': true
                            }
                        ],
                        'HISTORY': [
                            {
                                'STATS': 100,
                                'TRDAT': 1555075277829,
                                'TRUSR': null
                            }
                        ],
                        'LOCKED': true,
                        'LOCKED_BY': 'BOBU',
                        'LAST_UNLOCKED_BY': 'BOBU'
                    }
                ]
            }
        ];
    }

    getRatioData() {
        return [
            {state: 'Received', finished: 76.4, unfinished: 23.6},
            {state: 'Waiting for \n Approval', finished: 97.1, unfinished: 2.9},
            {state: 'Ready for \n Posting', finished: 82.7, unfinished: 17.3},
            {state: 'Posted', finished: 100, unfinished: 0}
        ];
    }

    getDataTypes() {
        return [
            {value: 'total', name: 'Touchless', color: '#96004d'},
            {value: 'kto', name: 'Auto Posted.', color: '#ff2900'},
            {value: 'lbx', name: 'AP-Touch', color: '#d40e8c'},
            {value: 'avs', name: 'No AP-Touch', color: '#404040'},
            {value: 'paypal', name: 'Received', color: '#d9d9d9'}
        ];
    }

    getDataTypeValues() {
        return [
            {date: '06.10.', kto: 0, lbx: 0, avs: 91.2, paypal: 0, total: 91.2},
            {date: '07.10.', kto: 0, lbx: 0, avs: 91.3, paypal: 0, total: 91.3}, {
                date: '08.10.',
                kto: 82.5,
                lbx: 87.8,
                avs: 90.4,
                paypal: 98.9,
                total: 89.9
            },
            {
                date: '09.10.',
                kto: 81.9,
                lbx: 85,
                avs: 92.3,
                paypal: 99.2,
                total: 89.6
            },
            {
                date: '10.10.',
                kto: 87.3,
                lbx: 81.9,
                avs: 92.9,
                paypal: 99.4,
                total: 90.4
            },
            {
                date: '11.10.',
                kto: 86.2,
                lbx: 88.9,
                avs: 89.1,
                paypal: 99.1,
                total: 90.8
            },
            {
                date: '12.10.',
                kto: 84.9,
                lbx: 86.9,
                avs: 92.6,
                paypal: 99.5,
                total: 93
            },
            {date: '13.10.', kto: 0, lbx: 0, avs: 92.6, paypal: 0, total: 92.6},
            {date: '14.10.', kto: 0, lbx: 0, avs: 93.3, paypal: 0, total: 93.3}, {
                date: '15.10.',
                kto: 81.6,
                lbx: 88.1,
                avs: 89.4,
                paypal: 98.7,
                total: 89.5
            },
            {
                date: '16.10.',
                kto: 84.3,
                lbx: 87.2,
                avs: 93.8,
                paypal: 99.3,
                total: 91.2
            },
            {date: '17.10.', kto: 87, lbx: 88, avs: 95.8, paypal: 99.7, total: 92.6},
            {
                date: '18.10.',
                kto: 79.8,
                lbx: 86.8,
                avs: 97.2,
                paypal: 99.2,
                total: 90.8
            },
            {
                date: '19.10.',
                kto: 83.2,
                lbx: 88.3,
                avs: 92.8,
                paypal: 99.4,
                total: 90.9
            }
        ];
    }
}
