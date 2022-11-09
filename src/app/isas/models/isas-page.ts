import {IsasControl} from './isas-control';
import {Pageable} from './pageable';
import {Sort} from './sort';

export class ISASPage {
  constructor(init?: Partial<ISASPage>) {
    Object.assign(this, init);
  }

  content: IsasControl[]|undefined;
  first: boolean|undefined;
  last: boolean|undefined;
  number: number|undefined;
  numberOfElements: number|undefined;
  pageable: Pageable|undefined;
  size: number|undefined;
  sort: Sort|undefined;
  totalElements: number|undefined;
  totalPages: number|undefined;
}
