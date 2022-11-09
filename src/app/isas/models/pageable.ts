import {Sort} from './sort';

export class Pageable {
  constructor(init?: Partial<Pageable>) {
    Object.assign(this, init);
  }

  offset: number|undefined;
  pageNumber: number|undefined;
  pageSize: number|undefined;
  paged: boolean|undefined;
  unpaged: boolean|undefined;
  sort: Sort|undefined;
}
