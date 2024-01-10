import { GlobalErrorService } from './global-error.service';
import { TestBed } from '@angular/core/testing';

describe('GlobalErrorService', () => {
  let globalErrorService: GlobalErrorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalErrorService
      ]
    });
    globalErrorService = TestBed.inject(GlobalErrorService);
    globalErrorService['errorMessage'] = '';
  });
  it('should create', () => {
    expect(globalErrorService).toBeDefined();
  });
  it('should reset error value', () => {
    globalErrorService.error = 'lol';
    expect(globalErrorService['errorMessage']).toEqual('lol');
  });
  it('should return error value', () => {
    expect(globalErrorService.error).toEqual('');
  });
});

