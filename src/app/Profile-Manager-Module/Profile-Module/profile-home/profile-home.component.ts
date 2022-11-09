import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { DxAccordionComponent } from 'devextreme-angular/ui/accordion';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {FormatTypeList} from '../../../shared/models/format-type-list';
import {ISAS} from '../../../shared/models/isas';
import {ListObject} from '../../../shared/models/list-object';
import {OperatorList} from '../../../shared/models/operator-list';
import {Condition, EntityId, ProcessingProfileSequence} from '../../models';
import {ConditionService, ProfileSequenceService, ProfileService} from '../../services';

@Component({
    selector: 'app-profile-home',
    templateUrl: './profile-home.component.html',
    styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {
    static sequenceFilter = '';

    @ViewChild('filterMenu') filterMenu?: DxAccordionComponent;
    @ViewChild('profileGrid') profileGrid?: DxDataGridComponent;
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;

    sequenceDataSource: DataSource;
    profileDataSource?: DataSource;
    searchMenu = ['Filter'];
    customizeColumns = DataGridUtil.customizeColumns;
    private profilePath = 'Profile-Manager-Module/profile';
    private filteredMode = false;
    private usedProfiles: EntityId[] = [];

    constructor(
        private router: Router, private profileService: ProfileService,
        private sequenceService: ProfileSequenceService,
        private conditionService: ConditionService) {
        this.sequenceDataSource = new DataSource({
            store: new CustomStore({
                load: () => this.sequenceService.readAllSequenceIds()
                    .toPromise()
                    .then(ids => ({data: ids}))
                    .catch(res => console.log(res))
            })
        });
    }

    ngOnInit() {
        this.loadProfiles();
    }

    // tslint:disable-next-line:no-any
    onRowExpanding(event: any) {
        this.conditionService.readConditionForProfile(event.key.profileId)
            .subscribe(res => (event.key.condition = res[0]));
    }

    // tslint:disable-next-line:no-any
    setSequenceFilter = (event: any) => ProfileHomeComponent.sequenceFilter = event.value;

    filterProfiles() {
        if (this.filterMenu && this.filterMenu.instance) {
            this.filterMenu.instance.collapseItem(0);
            const filter = ProfileHomeComponent.sequenceFilter;
            if (!isNullOrUndefined(filter) && filter.length > 0) {
                this.filteredMode = true;
                this.profileDataSource = new DataSource({
                    store: new CustomStore({
                        load: () => this.sequenceService
                            .readSequence(ProfileHomeComponent.sequenceFilter)
                            .toPromise()
                            .then(sequenceArray => {
                                const sequence = new ProcessingProfileSequence(sequenceArray[0]);
                                sequence.prepareProfileList();
                                sequence.processingProfileList.map(profile => {
                                    profile.condition = new Condition({parts: []})
                                });
                                return {data: sequence.processingProfileList};
                            })
                            .catch(err => err.status !== 404 && MessageToast.showError(err.message))
                    })
                });
            } else this.loadProfiles();
        }
    }

    loadProfiles() {
        this.filteredMode = false;
        this.profileDataSource = new DataSource({
            store: new CustomStore({
                load: () => this.profileService.readAllProfiles()
                    .toPromise()
                    .then(profiles => {
                        this.profileService
                            .determineUsageOfProfiles(profiles.map(profile => profile.profileId))
                            .subscribe(res => this.usedProfiles = res);
                        profiles.forEach(
                            profile => profile.condition =
                                new Condition({parts: []}));
                        return {data: profiles};
                    })
                    .catch(err => {
                        console.log(err);
                        if (err.status !== 404) {
                            MessageToast.showError(err.message);
                        }
                    })
            })
        });
    }

    addProfile() {
        this.router.navigate([this.profilePath, 'add']);
    }

    // tslint:disable-next-line:no-any
    editProfile(profileId: EntityId, event: any) {
        event.stopImmediatePropagation();

        this.router.navigate([this.profilePath, 'edit', profileId.name]);
    }

    // tslint:disable-next-line:no-any
    deleteProfile(profileId: EntityId, event: any) {
        event.stopImmediatePropagation();

        const result = confirm('Do you want to delete this Profile?', '');
        result.then(res => {
            if (res) {
                this.profileService.determineUsageOfProfiles([profileId])
                    .subscribe(
                        () => {MessageToast.showError('This profile is still used. Please ' +
                            'remove any references to this profile before deleting.');
                        },
                        () => {
                            if (this.profileDataSource) {
                                const conditionName = this.profileDataSource.items()
                                        .find(profile => profile.profileId.name === profileId.name)
                                        .conditionName;
                                this.profileService.deleteProfile(profileId).subscribe(
                                    () => this.conditionService
                                        .deleteCondition(new EntityId({
                                            name: conditionName,
                                            tenant: profileId.tenant
                                        }))
                                        .subscribe(
                                            () => this.reload(),
                                            err => {
                                                console.log(err);
                                                MessageToast.showError(err.message);
                                            }),
                                    err => {
                                        console.log(err);
                                        MessageToast.showError(err.message);
                                    });
                            }
                        });
            }
        });
    }

    // tslint:disable-next-line:no-any
    showInfo(profileId: EntityId, event: any) {
        event.stopImmediatePropagation();

        if (this.infoPopup && this.profileDataSource) {
            this.infoPopup.showInfoForObject(this.profileDataSource.items().find(
                profile => profile.profileId.name === profileId.name));
        }
    }

    // tslint:disable-next-line:no-any
    showUsageInfo(profileId: EntityId, event: any) {
        event.stopImmediatePropagation();

        this.router.navigate([this.profilePath, 'usageInfo', profileId.name]);
    }

    getButtonBackground(profileId: EntityId): string {
        if (this.filteredMode) {
            return 'bg-success';
        } else if (this.usedProfiles.find(
            entityId => entityId.name === profileId.name)) {
            return 'bg-success';
        }

        return 'bg-warning';
    }

    // tslint:disable-next-line:no-any
    getFormatTypeDisplayName(technicalName: any): string {
        return ListObject.getDisplayName(technicalName.value, FormatTypeList.list);
    }

    // tslint:disable-next-line:no-any
    getOperatorDisplayName(technicalName: any): string {
        return ListObject.getDisplayName(technicalName.value, OperatorList.list);
    }

    // tslint:disable-next-line:no-any
    getTableDisplayName(technicalName: any): string {
        return ListObject.getDisplayName(technicalName.value, ISAS.tables);
    }

    // tslint:disable-next-line:no-any
    getFieldDisplayName(technicalName: any): string {
        if (isNullOrUndefined(technicalName.value)) {
            return '';
        }

        let displayName = '';
        ISAS.tables.some(table => {
            const someField = table.isasFields.find(field => field.technicalName === technicalName.value);
            if (someField) {
                displayName = someField.displayName;
                return true;
            }
            return false;
        });
        return displayName;
    }

    reload() {
        if (this.filterMenu && this.filterMenu.instance) this.filterMenu.instance.collapseItem(0);

        if (this.profileDataSource) {
            if (ProfileHomeComponent.sequenceFilter === null) {
                if (this.filteredMode) return this.loadProfiles();
            } else if (!this.filteredMode) {
                return this.filterProfiles();
            }

            this.profileDataSource.reload();
        }
    }

    // tslint:disable-next-line:no-any
    onToolbarPreparing(e: any) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Refresh',
                    icon: 'refresh',
                    onClick: this.reload.bind(this)
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Add new Profile',
                    icon: 'add',
                    onClick: this.addProfile.bind(this)
                }
            });
    }

    bracesAsString = (bracesCount: number, start: boolean): string => (start ? '[' : ']').repeat(bracesCount);



    // tslint:disable-next-line:no-any
    onExporting(e: any) {
        e.component.beginUpdate();
        e.component.columnOption('profileId', 'visible', false);
    }

    // tslint:disable-next-line:no-any
    onExported(e: any) {
        e.component.columnOption('profileId', 'visible', true);
        e.component.endUpdate();
    }
}
