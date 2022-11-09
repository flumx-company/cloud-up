import {Component, OnInit} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {alert} from 'devextreme/ui/dialog';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {AuthService} from '../../../shared/services/auth.service';
import {AuthToken} from '../../../shared/models/auth-token';
import {Role} from '../../models/role';
import {Tenant} from '../../models/tenant';
import {User} from '../../models/user';
import {ActivateTenant} from '../../models/activate-tenant';
import {RoleService} from '../../services/role.service';
import {TenantService} from '../../services/tenant.service';
import {UserManagerService} from '../../services/user-manager.service';
import {RegistrationService} from '../../services/registration.service';


@Component({
  selector: 'app-user-manager-home',
  templateUrl: './user-manager-home.component.html',
  styleUrls: ['./user-manager-home.component.css']
})

export class UserManagerHomeComponent implements OnInit {
  authTokenData: AuthToken | undefined;
  dataSource: DataSource;

  possibleRoles: Role[] = [];
  tenants: Tenant[] = [];
  possibleTenants: Tenant[] = [];
  defaultTenant = -1;

  customizeColumns = DataGridUtil.customizeColumns;
  tenantsDisabled = false;
  checkBoxesDisabled = false;


  constructor(
      private userManagerService: UserManagerService,
      private roleService: RoleService,
      private tenantService: TenantService,
      private registrationService: RegistrationService,
      private authService: AuthService) {

    this.dataSource = new DataSource({
      store: new CustomStore({
        loadMode: 'raw',
        load: () => this.userManagerService.getAll()
          .toPromise()
          .then(users => {
            return this.filterUsers(users);
          })
          .catch(err => console.log(err)),
        insert: (user: User) => {
          return this.userManagerService.create(user)
            .toPromise()
            .then(newUser => JSON.parse(JSON.stringify(newUser)))
            .catch(err => console.log(err));
        },
        byKey: (user: User) =>
          this.userManagerService.get(user.id!).toPromise().then(
            user => JSON.parse(JSON.stringify(user))),
        update: (user: User, data) => {
          return this.userManagerService.update(user.id!, data)
            .toPromise()
            .then(updatedUser => JSON.parse(JSON.stringify(updatedUser)))
            .catch(err => console.log(err));
        },
        remove: user => this.userManagerService.delete(user).toPromise().catch(err => console.log(err))
      })
    });
  }


  ngOnInit() {
    this.roleService.getAll().subscribe(
      roles => {
        this.possibleRoles = roles ? roles : [];
      },
      err => {
        MessageToast.showError(err.message);
      }
    );

    this.tenantService.getAll().subscribe(
      tenants => {
        this.tenants = tenants;
      },
      err => {
        MessageToast.showError(err.message);
      }
    );

    this.authTokenData = this.authService.getTokenData();

    if (this.authTokenData) {
      this.possibleTenants = this.authTokenData.tenants;
      this.defaultTenant = this.authTokenData.tenant;
    }
  }

  // tslint:disable-next-line:no-any
  onCellPrepared(event: any) {
    if (event.rowType === 'data' && event.column.command === 'edit') {
      const isEditing = event.row.isEditing, cellElement = event.cellElement;

      if (isEditing) {
        const saveLink = cellElement.querySelector('.dx-link-save'),
              cancelLink = cellElement.querySelector('.dx-link-cancel');

        saveLink.classList.add('dx-icon-save');
        cancelLink.classList.add('dx-icon-revert');

        saveLink.textContent = '';
        cancelLink.textContent = '';
      } else {
        const editLink = cellElement.querySelector('.dx-link-edit'),
              deleteLink = cellElement.querySelector('.dx-link-delete');

        editLink.classList.add('dx-icon-edit');
        deleteLink.classList.add('dx-icon-trash');

        editLink.textContent = '';
        deleteLink.textContent = '';
      }
    }
  }

  // tslint:disable-next-line:no-any
  onInitNewRow(event: any) {
    const user: User = event.data;
    const tenantId = this.defaultTenant;

    user.defaultTenant = this.defaultTenant;
    user.tenantIds = [tenantId];
    user.locked = true;
    user.enabled = false;
    user.initial = true;

    this.tenantsDisabled = true;
    this.checkBoxesDisabled = true;
  }


  // tslint:disable-next-line:no-any
  onEditStart(event: any) {
    this.tenantsDisabled = false;
    this.checkBoxesDisabled = false;
  }

  // tslint:disable-next-line:no-any
  onRowPrepared(event: any) {
    if (event.rowType === "data" && event.data.activated === false) {
      const td = event.rowElement.children[event.rowElement.children.length -1];
      td.className += " edit-disabled";
    }
  }

  // tslint:disable-next-line:no-any
  onTenantsChanged(event: any, user: User) {
    // tslint:disable-next-line:no-any
    let item: any;

    if (event.removedItems.length > 0) {
      item = event.removedItems[0];

      if (item.id === user.defaultTenant) {
        event.component.option("value").push(item.id);
        alert("The default tenant cannot be removed", "Not allowed");
      }
    }
  }

  // tslint:disable-next-line:no-any
  onResetPassword(event: any, user: User) {
    this.registrationService.resetUserPassword(user).subscribe(
      resp => {
        user.locked = true;
      },
      err => {
        MessageToast.showError(err.message);
      }
    );
  }

  // tslint:disable-next-line:no-any
  onActivateTenant(event: any, user: User) {
    const at = {id: this.defaultTenant.toString(), activate: true} as ActivateTenant;

    this.userManagerService.activateTenant(at).subscribe(
      resp => {
        this.dataSource.reload();
      },
      err => {
        MessageToast.showError(err.message);
      }
    );
  }

  private filterUsers(users: User[]): User[] {
    const activatedUsers: User[] = [];
    const disabledUsers: User[] = [];

    for (const user of users) {
      if (user.tenantIds.includes(this.defaultTenant)) {
        user.activated = true;
        activatedUsers.push(user);
      } else {
        user.activated = false;
        disabledUsers.push(user);
      }
    }

    return activatedUsers.concat(disabledUsers);
  }
}
