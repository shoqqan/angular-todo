import { AddItemFormComponent } from './add-item-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AddItemFormComponent', () => {
  let addItemFormComponent: AddItemFormComponent;
  let fixture: ComponentFixture<AddItemFormComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddItemFormComponent]
    });
    fixture = TestBed.createComponent(AddItemFormComponent);
    addItemFormComponent = fixture.componentInstance;
    addItemFormComponent.placehold = 'test';
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(addItemFormComponent).toBeDefined();
  });
  it('should return correct title value', () => {
    expect(addItemFormComponent.title).toEqual(addItemFormComponent.form.controls.title);
  });
  it('placehold input should return correct values', () => {
    addItemFormComponent.placehold = 'test2';
    expect(addItemFormComponent.placeholder).toEqual('test2');
  });
  it('component should output title value', () => {
    addItemFormComponent.title.setValue('hello');
    const event = spyOn(addItemFormComponent.addItem, 'emit');
    addItemFormComponent.onAddItem();
    expect(event).toHaveBeenCalledWith('hello');
  });
  it('onAddItem() shouldn\'t work with errors', () => {
    addItemFormComponent.title.setValue('');
    addItemFormComponent.onAddItem();
    expect(addItemFormComponent.errorMessage).toEqual('Fill the value');
  });
});
