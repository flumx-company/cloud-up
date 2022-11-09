import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {confirm} from 'devextreme/ui/dialog';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {DirtyCheck} from '../../../shared/helpers/dirty-check';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {FormatTypeList} from '../../../shared/models/format-type-list';
import {ListObject} from '../../../shared/models/list-object';
import {AccountingSystem, Condition, FineFilter, ProcessingProfile, Restriction} from '../../models';
import {ProcessingFunction} from '../../models/processing-functions';
import {FunctionType} from '../../models/processing-functions/function-type';
import {FunctionTypeEnum} from '../../models/processing-functions/function-type-enum';
import {
    AccountingSystemService,
    ConditionService,
    FineFilterService,
    ProfileSequenceService,
    ProfileService,
    RestrictionService
} from '../../services';
import {ProfileDetailConditionComponent} from '../../other-components/profile-detail-condition/profile-detail-condition.component';

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
    @ViewChild(ProfileDetailConditionComponent)
    profileDetailConditionComponent?: ProfileDetailConditionComponent;
    // tslint:disable-next-line:no-any
    @ViewChild('usageInfoButton') usageInfoButton?: any;

    conditionList: Condition[] = [];
    currentProfile: ProcessingProfile = new ProcessingProfile();
    currentCondition: Condition = new Condition();
    formatType = FormatTypeList.list;
    viewMode = '';
    isUsedBackground = 'bg-warning';
    onCellPrepared = DataGridUtil.onCellPrepared;
    customizeColumns = DataGridUtil.customizeColumns;
    currentProcessingFunction: ProcessingFunction = new ProcessingFunction();
    functionViewMode = 'add';
    isFunctionFormHidden = true;
    backupProfile = '';
    backupCondition = '';

    SELECT_OPEN_ITEMS = FunctionTypeEnum.SELECT_OPEN_ITEMS;
    MATCH_AMOUNT_ALL = FunctionTypeEnum.MATCH_AMOUNT_ALL;
    MATCH_AMOUNT_SUBSETTING = FunctionTypeEnum.MATCH_AMOUNT_SUBSETTING;

    accountingSystems: AccountingSystem[] = [];
    restrictions: Restriction[] = [];
    filters: FineFilter[] = [];

    private profilePath = 'Profile-Manager-Module/profile';

    constructor(
        private route: ActivatedRoute, private router: Router,
        private profileService: ProfileService,
        private conditionService: ConditionService,
        private sequenceService: ProfileSequenceService,
        private accountingSystemService: AccountingSystemService,
        private restrictionService: RestrictionService,
        private filterService: FineFilterService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (!params['name']) {
                this.viewMode = 'Add';
                this.currentProfile = new ProcessingProfile();
                this.currentCondition = new Condition();
            } else {
                this.viewMode = 'Edit';
                this.loadCurrentProfile(params['name']);
            }
        });

        this.readAllConditions();
        this.loadAccountingSystems();
        this.loadRestrictions();
        this.loadFilters();
    }

    private loadAccountingSystems() {
        this.accountingSystemService.readAllAccountingSystems()
            .subscribe(res => this.accountingSystems = res.filter(system => system.active));
    }

    private loadRestrictions() {
        this.restrictionService.readAllRestrictions()
            .subscribe(
            res => this.restrictions = res.filter(restriction => restriction.status === 'ACTIVE'));
    }

    private loadFilters() {
        this.filterService.getFilterForTenant()
            .subscribe(res => this.filters = res.filter(filter => filter.active));
    }

    private loadCurrentProfile(name: string) {
        this.profileService.readProfile(name)
            .subscribe(res => {
                this.currentProfile = res[0];
                this.currentProfile.processingFunctions.sort(
                    (func1, func2) => func1.index - func2.index);
                this.backupProfile =
                    DirtyCheck.getStringFromStringOrObject(this.currentProfile);

                this.sequenceService
                    .isProfileUsedInSequence(this.currentProfile.profileId)
                    .subscribe(
                        () => this.isUsedBackground = 'bg-success',
                        error => {
                            error.status !== 404 && MessageToast.showError(error.message);
                            this.isUsedBackground = 'bg-warning';
                        });

                this.conditionService
                    .readConditionForProfile(this.currentProfile.profileId)
                    .subscribe(
                        result => {
                            this.currentCondition = result[0];
                            this.backupCondition = DirtyCheck.getStringFromStringOrObject(
                                this.currentCondition);
                        },
                        error => {
                            error.status !== 404 && MessageToast.showError(error.message);
                            this.currentCondition = new Condition();
                        });
            }, error => MessageToast.showError(error.message));
    }

    private readAllConditions() {
        this.conditionService.readAllConditions().subscribe(
            res => {
                if (res) {
                    this.conditionList = res;
                    this.conditionList = this.conditionList.filter(
                        condition => condition.status === 'ACTIVE');
                } else {
                    this.conditionList = [];
                }
            },
            error => {
                console.log(error);
            });
    }

    navBack() {
        if (DirtyCheck.isDirty(this.backupCondition, this.currentCondition) ||
            DirtyCheck.isDirty(this.backupProfile, this.currentProfile)) {
            confirm('Continue without saving?', '')
                .then(res => res && this.router.navigate([this.profilePath]));
        } else {
            this.router.navigate([this.profilePath]);
        }
    }

    // tslint:disable-next-line:no-any
    save(event: any) {
        event.preventDefault();

        this.currentCondition.entityId.name =
            `${this.currentProfile.profileId.name.substr(0, 15)}_condition`;
        this.currentCondition.processProfile = this.currentProfile.profileId.name;
        this.currentProfile.conditionName = this.currentCondition.entityId.name;
        this.currentCondition.formatType = this.currentProfile.formatType;

        if (this.currentProfile.active) {
            this.currentCondition.status = 'ACTIVE';
        } else {
            this.currentCondition.status = 'INACTIVE';
        }

        this.profileDetailConditionComponent &&  this.profileDetailConditionComponent.validateCondition();

    }

    validationError(error: string) {
        MessageToast.showError(error);
    }

    validationSuccess() {
        if (this.viewMode === 'Add') {
            this.conditionService.saveCondition(this.currentCondition)
                .subscribe(
                    () =>
                        this.profileService.saveProfile(this.currentProfile)
                            .subscribe(
                                () => {
                                    this.router.navigate([this.profilePath]);
                                },
                                error => {
                                    console.log(error);
                                    MessageToast.showError(error.message);
                                    this.conditionService
                                        .deleteCondition(this.currentCondition.entityId)
                                        .subscribe(
                                            deletionResult => deletionResult,
                                            err => MessageToast.showError(err.message));
                                }),
                    error => {
                        console.log(error);
                        MessageToast.showError(error.message);
                    });
        } else {
            this.conditionService.updateCondition(this.currentCondition)
                .subscribe(
                    () => this.profileService.updateProfile(this.currentProfile)
                        .subscribe(
                            () => {
                                this.router.navigate([this.profilePath]);
                            },
                            error => {
                                console.log(error);
                                MessageToast.showError(error.message);
                            }),
                    error => {
                        console.log(error);
                        MessageToast.showError(error.message);
                    });
        }
    }

    showInfo = () => this.infoPopup && this.infoPopup.showInfoForObject(this.currentProfile);

    showUsageInfo =() => this.router.navigate([this.profilePath, 'usageInfo', this.currentProfile.profileId.name]);


    addProcessingFunction() {
        this.currentProcessingFunction = new ProcessingFunction(
            {index: this.currentProfile.processingFunctions.length});
        this.functionViewMode = 'add';
        this.showFunctionForm();
    }

    switchProcessingFunctions(functionIndex1: number, functionIndex2: number) {
        const firstFunction = this.currentProfile.processingFunctions[functionIndex1];
        const secondFunction = this.currentProfile.processingFunctions[functionIndex2];
        firstFunction.index = functionIndex2;
        secondFunction.index = functionIndex1;
        this.currentProfile.processingFunctions.splice(firstFunction.index, 1, firstFunction);
        this.currentProfile.processingFunctions.splice(secondFunction.index, 1, secondFunction);
    }

    moveToStart(index: number) {
        const func = this.currentProfile.processingFunctions.splice(index, 1);
        this.currentProfile.processingFunctions.unshift(...func);
        this.currentProfile.processingFunctions.forEach((func, index) => func.index = index);
    }

    moveToEnd(index: number) {
        const func = this.currentProfile.processingFunctions.splice(index, 1);
        this.currentProfile.processingFunctions.push(...func);
        this.currentProfile.processingFunctions.forEach((func, index) => func.index = index);
    }

    moveOneUp = (index: number) => index > 0 && this.switchProcessingFunctions(index, index - 1)

    moveOneDown(index: number) {
        if (index < this.currentProfile.processingFunctions.length - 1) {
            this.switchProcessingFunctions(index, index + 1);
        }
    }

    removeProcessingFunction(index: number) {
        confirm('Delete this function?', '')
            .then(res => {
                if (res) {
                    this.currentProfile.processingFunctions.splice(index, 1);
                    this.currentProfile.processingFunctions
                        .slice(index, this.currentProfile.processingFunctions.length)
                        .forEach(func => func.index && func.index--);
                }
            });
    }

    editProcessingFunction(index: number) {
        const func = this.currentProfile.processingFunctions.find(func => func.index === index);

        if (func) {
            this.currentProcessingFunction = JSON.parse(JSON.stringify(func));
            this.functionViewMode = 'edit';
            this.showFunctionForm();
        }
    }

    // tslint:disable-next-line:no-any
    onToolbarPreparing(event: any) {
        event.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                hint: 'Add Processing Function',
                icon: 'add',
                onClick: this.addProcessingFunction.bind(this)
            }
        });
    }

    // tslint:disable-next-line:no-any
    getTypeDisplayName(technicalName: any): string {
        return ListObject.getDisplayName(technicalName.value, FunctionType.list);
    }

    saveProcessingFunction() {
        switch (this.currentProcessingFunction.type) {
            case FunctionTypeEnum.MATCH_AMOUNT_ALL:
                if (!this.currentProcessingFunction.matchAmountConfiguration!
                        .accountingMode ||
                    this.currentProcessingFunction.matchAmountConfiguration!
                        .accountingMode!.length === 0) {
                    MessageToast.showError('Select a posting mode');
                    return;
                }
                this.currentProcessingFunction.selectOpenItemConfiguration = null;
                this.currentProcessingFunction.matchAmountSubSettingConfiguration =
                    null;
                break;
            case FunctionTypeEnum.MATCH_AMOUNT_SUBSETTING:
                if (!this.currentProcessingFunction.matchAmountSubSettingConfiguration!
                        .accountingMode ||
                    this.currentProcessingFunction.matchAmountSubSettingConfiguration!
                        .accountingMode!.length < 1) {
                    MessageToast.showError('Select a posting mode');
                    return;
                }

                if (!this.currentProcessingFunction.matchAmountSubSettingConfiguration!
                        .subSettingConfigurations ||
                    this.currentProcessingFunction.matchAmountSubSettingConfiguration!
                        .subSettingConfigurations!.length < 1) {
                    MessageToast.showError('Configure at least one sub-set');
                    return;
                }

                this.currentProcessingFunction.selectOpenItemConfiguration = null;
                this.currentProcessingFunction.matchAmountConfiguration = null;
                break;
            case FunctionTypeEnum.SELECT_OPEN_ITEMS:
                if (!this.currentProcessingFunction.selectOpenItemConfiguration!
                        .useCharacteristicIdentificationResults &&
                    !this.currentProcessingFunction.selectOpenItemConfiguration!
                        .useFilter &&
                    !this.currentProcessingFunction.selectOpenItemConfiguration!
                        .useOptimizationResults &&
                    !this.currentProcessingFunction.selectOpenItemConfiguration!
                        .usePreviousSelectedOpenItems) {
                    MessageToast.showError('Select at least one selection option');
                    return;
                }

                this.currentProcessingFunction.matchAmountSubSettingConfiguration =
                    null;
                this.currentProcessingFunction.matchAmountConfiguration = null;
                break;
            default:
                break;
        }

        if (this.functionViewMode === 'add') {
            this.currentProcessingFunction.index =
                this.currentProfile.processingFunctions.length;
            this.currentProfile.processingFunctions.push(
                this.currentProcessingFunction);
        } else {
            this.currentProfile.processingFunctions.splice(
                this.currentProcessingFunction.index, 1,
                this.currentProcessingFunction);
        }
        this.hideFunctionForm();
    }

    hideFunctionForm() {
        this.isFunctionFormHidden = true;
    }

    showFunctionForm() {
        this.isFunctionFormHidden = false;
        setTimeout(() => {
            const element = document.querySelector('#functionForm');
            if (element) {
                element.scrollIntoView(
                    {behavior: 'smooth', block: 'start', inline: 'nearest'});
            }
        }, 500);
    }

    // tslint:disable-next-line:no-any
    customizeIndex(index: any): string {
        return '' + (Number(index.value) + 1);
    }
}
