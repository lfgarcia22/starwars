import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TablePaginationComponent } from './table-pagination.component';

describe('Table Pagination Component', () => {
  let component: TablePaginationComponent;
  let fixture: ComponentFixture<TablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePaginationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.current).toBe(1);
    expect(component.route).toEqual([]);
    expect(component.count).toBeUndefined();
  });

  describe('Total Pages', () => {
    it('should return an array of 1 when current is 0', () => {
      const expected: number[] = [1];
      component.current = 0;

      const actual = component.totalPages;

      expect(actual).toEqual(expected);
    });

    it('should return empty array when count not defined', () => {
      const expected: number[] = [];

      const actual = component.totalPages;

      expect(actual).toEqual(expected);
    });

    it('should return first value as 1 when count is defined', () => {
      const expected = 1;
      component.count = 1;

      const actual = component.totalPages;

      expect(actual.length).toBeGreaterThan(0);
      expect(actual[0]).toEqual(expected);
    });

    it('should return last value as total pages length when count is base of 10', () => {
      const expected = 5;
      component.count = 50;

      const actual = component.totalPages;

      expect(actual.length).toBe(expected);
    });

    it('should return last value as total pages length when count is base of 10', () => {
      const expected = 5;
      component.count = 50;

      const actual = component.totalPages;

      expect(actual.length).toBe(expected);
    });
  });

  describe('Slice From Current', () => {
    it('should return 0 when the current page is 1', () => {
      const expected = 0;

      const actual = component.sliceFromCurrent;

      expect(actual).toEqual(expected);
    });

    it('should return total pages minus 3 when the current page is the last one', () => {
      let expected = -1;
      component.current = 2;
      component.count = 20;

      let actual = component.sliceFromCurrent;

      expect(actual).toEqual(expected);

      // New try...
      expected = 3;
      component.current = 6;
      component.count = 60;

      actual = component.sliceFromCurrent;

      expect(actual).toEqual(expected);
    });

    it('should return total pages minus 2 when the current page is between first an last', () => {
      let expected = 0;
      component.current = 2;
      component.count = 30;

      let actual = component.sliceFromCurrent;

      expect(actual).toEqual(expected);

      // New Try...
      expected = 3;
      component.current = 5;
      component.count = 80;

      actual = component.sliceFromCurrent;

      expect(actual).toEqual(expected);
    });
  });

  describe('Slice To Current', () => {
    it('should return 3 when the current page is 1', () => {
      const expected = 3;

      const actual = component.sliceToCurrent;

      expect(actual).toEqual(expected);
    });

    it('should return total pages when the current page is the last one', () => {
      let expected = 2;
      component.current = 2;
      component.count = 20;

      let actual = component.sliceToCurrent;

      expect(actual).toEqual(expected);

      // New try...
      expected = 6;
      component.current = 6;
      component.count = 60;

      actual = component.sliceToCurrent;

      expect(actual).toEqual(expected);
    });

    it('should return total pages plus 1 when the current page is between first an last', () => {
      let expected = 3;
      component.current = 2;
      component.count = 30;

      let actual = component.sliceToCurrent;

      expect(actual).toEqual(expected);

      // New Try...
      expected = 6;
      component.current = 5;
      component.count = 80;

      actual = component.sliceToCurrent;

      expect(actual).toEqual(expected);
    });
  });

  describe('Classes', () => {
    it('should contain class pagination', () => {
      const className = '.pagination';

      const actual = fixture.debugElement.queryAll(By.css(className));

      expect(actual.length).toBeGreaterThan(0);
    });

    it('should contain at least 4 links', () => {
      const className = '.pagination-link';
      component.current = 0;

      fixture.detectChanges();
      const actual = fixture.debugElement.queryAll(By.css(className));

      expect(actual.length).toBeGreaterThanOrEqual(4);
    });

    it('should contain 1 number when no results', () => {
      const className = '.number';
      component.current = 0;

      fixture.detectChanges();
      const actual = fixture.debugElement.queryAll(By.css(className));

      expect(actual.length).toBe(1);
    });

    it('should contain at least 1 number when result has 1 page', () => {
      const className = '.number';
      component.count = 10;

      fixture.detectChanges();
      const actual = fixture.debugElement.queryAll(By.css(className));

      expect(actual.length).toBeGreaterThanOrEqual(1);
    });

    it('should contain 3 numbers when result has more than 3 pages and page is the first', () => {
      const className = '.number';
      component.current = 1;
      component.count = 60;

      fixture.detectChanges();
      const actual = fixture.debugElement.queryAll(By.css(className));

      expect(actual.length).toBe(3);
    });

    it('should contain 3 numbers when result has more than 3 pages and page is between first and last', () => {
      const className = '.number';
      component.current = 4;
      component.count = 60;

      fixture.detectChanges();
      const actual = fixture.debugElement.queryAll(By.css(className));

      expect(actual.length).toBe(3);
    });

    it('should contain 3 numbers when result has more than 3 pages and page is the last', () => {
      const className = '.number';
      component.current = 4;
      component.count = 60;

      fixture.detectChanges();
      const actual = fixture.debugElement.queryAll(By.css(className));

      expect(actual.length).toBe(3);
    });
  });

});
