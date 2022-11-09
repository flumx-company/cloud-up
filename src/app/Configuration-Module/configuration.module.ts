import { NgModule }                     from '@angular/core';
import { RouterModule }                 from "@angular/router";

import { ConfigurationMenuComponent }   from "./_component/configuration-menu.component";

const routes: any = [
    {
        path: '',
        children: [
            {path: '',                     component   :  ConfigurationMenuComponent   },
            {
                path: 'field-configuration',
                loadChildren:  './Field-Configuration-Module/field-configuration.module#FieldConfigurationModule'
            },
            {
                path: 'validations',
                loadChildren:  './Validations-Module/validations.module#ValidationsModule'
            },
            {
                path: 'routing',
                loadChildren:  './Routing-Module/routing.module#RoutingModule'
            },
            {
                path: 'action-button',
                loadChildren:  './Action-Button-Module/action.button.module#ActionButtonModule'
            },
            {
                path: 'approvals',
                loadChildren:  './Approvals-Module/approvals.module#ApprovalsModule'
            },
            {
                path: 'general-technical',
                loadChildren:  './Technical-Configuration-Module/technical-configuration.module#TechnicalConfigurationModule'
            },
            {
                path: 'invoice-gateway',
                loadChildren:  './Invoice-Gateway-Module/invoice.gateway.module#InvoiceGatewayModule'
            },
            {
                path: 'notifications',
                loadChildren: './Notification-Module/notification.module#NotificationModule'
            },
            {
                path: 'posting-controls',
                loadChildren:  './Posting-Control-Module/posting.control.module#PostingControlModule'
            },
            {
                path: 'status-configuration',
                loadChildren:  './Status-Config-Module/status.config.module#StatusConfigModule'
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        ConfigurationMenuComponent
    ]
})

export class ConfigurationMenuModule {}
