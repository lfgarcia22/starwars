import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent {

  @Input() route: string[] = [];
  @Input() current = 1;
  @Input() count?: number;

  get totalPages(): number[] {
    if (this.current === 0) {
      return [1];
    } else if (!this.count) {
      return [];
    }
    const arraySize = Math.floor(this.count / 10);
    const arrayKeys = Array(arraySize > 0 ? arraySize : 1).keys();
    return Array.from(arrayKeys).map(page => page + 1);
  }

  get sliceFromCurrent(): number {
    if (this.current === 1) {
      return 0;
    } else if (this.current === this.totalPages.length) {
      return this.totalPages.length - 3;
    }
    return this.current - 2;
  }

  get sliceToCurrent(): number {
    if (this.current === 1) {
      return 3;
    } else if (this.current === this.totalPages.length) {
      return this.totalPages.length;
    }
    return this.current + 1;
  }

}
