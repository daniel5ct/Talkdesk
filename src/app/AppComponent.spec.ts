import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './AppComponent';
import { FormsModule } from '@angular/forms';
import { WebRequestJsonService } from 'src/services/WebRequestJsonService';

describe('AppComponent', () => {
  beforeEach(async(() => {
    const webRequestSpy =
      jasmine.createSpyObj('WebRequestJsonService', ['RequestJSON']);
    webRequestSpy.RequestJSON.and.callFake((url) => {
      return new Promise((resolve) => resolve({
        value: [{
          "id": "9b565b11-7311-5b5e-a699-97873dffb361",
          "name": "Voice Report",
          "description": "Calls reporting and analytics of your calls.",
          "categories": ["Voice Analytics", "Reporting", "Optimization"],
          "subscriptions": [{
            "name": "Trial",
            "price": 0
          },
          {
            "name": "Professional",
            "price": 3500
          }
          ]
        }]
      }))
    });

    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: WebRequestJsonService, useValue: webRequestSpy },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render 1 app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.Apps).not.toBeNull();
    expect(fixture.componentInstance.Apps.length).toBe(1);
  })

  it('should have a correct name', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.Apps[0].name).toBe('Voice Report');
  })

  it('should render name in a h1', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Voice Report');
  })

  it('should have 3 categories', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.Categories).not.toBeNull();
    expect(fixture.componentInstance.Categories.length).toBe(3);
  })

  it('should render 3 categories', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.Categories).toContain("Voice Analytics");
    expect(fixture.componentInstance.Categories).toContain("Reporting");
    expect(fixture.componentInstance.Categories).toContain("Optimization");
  })

  it('should render categories in a h2', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Categories');
  });

  it('should have 2 subscriptions', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.Apps[0].subscriptions).not.toBeNull();
    expect(fixture.componentInstance.Apps[0].subscriptions.length).toBe(2);
  })

  it('should render 2 subscriptions', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.Apps[0].subscriptions[0].name).toContain("Trial");
    expect(fixture.componentInstance.Apps[0].subscriptions[0].price).toBe(0);
  })

  it('should render subscriptions name in a span', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.box-info--footer span').textContent).toContain('Trial');
  })
});