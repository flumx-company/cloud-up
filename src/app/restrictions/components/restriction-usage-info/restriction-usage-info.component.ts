import {Location} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isNullOrUndefined} from 'util';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {InsertMetaData} from '../../../shared/models/insert-meta-data';
import {UpdateMetaData} from '../../../shared/models/update-meta-data';
import {EntityId} from '../../models/entity-id';
import {Restriction} from '../../models/restriction';
import {RestrictionService} from '../../services/restriction.service';

@Component({
  selector: 'app-restriction-usage-info',
  templateUrl: './restriction-usage-info.component.html',
  styleUrls: ['./restriction-usage-info.component.css']
})
export class RestrictionUsageInfoComponent implements OnInit {
  @Input() restrictions: Restriction[] = [];
  currentRestriction: Restriction;
  filteredRestrictions: Restriction[] = [];

  selectedRestriction: Restriction;
  infoVisible = false;
  currentPath = '';
  name: string|null = '';
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private location: Location, private route: ActivatedRoute,
      private restrictionService: RestrictionService) {
    this.selectedRestriction = new Restriction({entityId: new EntityId()});
    this.currentRestriction = new Restriction({entityId: new EntityId()});
    this.filteredRestrictions = [];
  }

  ngOnInit() {
    this.route.url.subscribe(url => (this.currentPath = url[0].path));

    this.route.queryParamMap.subscribe(params => {
      if (params.has('name')) {
        this.name = params.get('name');

        if (isNullOrUndefined(this.restrictions) ||
            this.restrictions.length <= 0) {
          this.readAllRestrictions();
        } else {
          this.loadCurrentRestriction();
          this.filterRestrictions();
        }
      }
    });
  }

  readAllRestrictions() {
    this.restrictionService.readAllRestrictions().subscribe(
        res => {
          this.restrictions = res;
          this.loadCurrentRestriction();
          this.filterRestrictions();
        },
        error => {
          if (error.status === 404) {
            this.restrictions = [];
            this.filteredRestrictions = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  loadCurrentRestriction() {
    const restriction =
        this.restrictions.find(con => con.entityId.name === this.name);
    if (restriction) {
      this.currentRestriction = restriction;
    }
  }

  filterRestrictions() {
    this.filteredRestrictions = this.restrictions.filter(
        con => con.entityId.name !== this.name &&
            con.parts.find(part => part.restriction === this.name));
  }

  navBack() {
    this.location.back();
  }

  editRestriction(name: string) {
    window.open(
        `${location.protocol}//${location.host}${
            location.pathname}?mode=Edit&name=${name}`,
        '_blank');
  }

  // tslint:disable-next-line:no-any
  showInfo(name: string, event: any) {
    event.stopImmediatePropagation();

    const restriction =
        this.filteredRestrictions.find(con => con.entityId.name === name);

    if (restriction) {
      this.selectedRestriction = restriction;

      if (isNullOrUndefined(this.selectedRestriction.insertMetadata)) {
        this.selectedRestriction.insertMetadata = new InsertMetaData();
      }

      if (isNullOrUndefined(this.selectedRestriction.updateMetadata)) {
        this.selectedRestriction.updateMetadata = new UpdateMetaData();
      }

      this.infoVisible = true;
    }
  }

  // tslint:disable-next-line:no-any
  selectionChanged(e: any) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  }

  // tslint:disable-next-line:no-any
  onFileSaving(e: any) {
    e.fileName = `usage_info_${this.currentRestriction.entityId.name}`;
  }

  // tslint:disable-next-line:no-any
  onContentReady(e: any) {
    e.component.option('loadPanel.enabled', false);
  }

  bracesAsString(bracesCount: number, start: boolean) {
    if (start) {
      return '['.repeat(bracesCount);
    } else {
      return ']'.repeat(bracesCount);
    }
  }
}
