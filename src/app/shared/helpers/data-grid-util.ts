export class DataGridUtil {
  // tslint:disable-next-line:no-any
  static customizeColumns(cols: any[]) {
    cols.filter(col => !col.alignment).forEach(col => col.alignment = 'center');
  }

  // tslint:disable-next-line:no-any
  static onCellPrepared(event: any) {
    if (event.rowType === 'data' && event.column.command === 'edit') {
      const isEditing = event.row.isEditing, cellElement = event.cellElement;

      if (isEditing) {
        const saveLink = cellElement.querySelector('.dx-link-save'),
              cancelLink = cellElement.querySelector('.dx-link-cancel');

        if (saveLink) {
          saveLink.classList.add('dx-icon-save');
          saveLink.textContent = '';
        }

        if (cancelLink) {
          cancelLink.classList.add('dx-icon-revert');
          cancelLink.textContent = '';
        }
      } else {
        const editLink = cellElement.querySelector('.dx-link-edit'),
              deleteLink = cellElement.querySelector('.dx-link-delete');

        if (editLink) {
          editLink.classList.add('dx-icon-edit');
          editLink.textContent = '';
        }

        if (deleteLink) {
          deleteLink.classList.add('dx-icon-trash');
          deleteLink.textContent = '';
        }
      }
    }
  }
}
