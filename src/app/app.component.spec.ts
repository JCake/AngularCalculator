import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture;
  let app;
  let compiledDOM;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    compiledDOM = fixture.debugElement.nativeElement;
  }));

  it('should create the app', () => {   
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-calculator'`, () => {
    expect(app.title).toEqual('angular-calculator');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    expect(compiledDOM.querySelector('h1').textContent).toContain('Welcome to angular-calculator!');
  });

  it('should render 10 buttons with numbers 0-9', () => {
    fixture.detectChanges();
    const numberButtons: NodeList = compiledDOM.querySelectorAll('button.numberButton');
    expect(numberButtons.length).toEqual(10);
    const buttonTexts: string[] = [];
    numberButtons.forEach((button) => buttonTexts.push(button.textContent.trim()));
    for(let i = 0; i <= 9; i++){
      expect(buttonTexts.indexOf(`${i}`)).toBeGreaterThan(-1);
    }
  });

  it('should render a "screen" to display output', () => {
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.mainScreen')).toBeTruthy();
  });

  it('should render number of button pressed on the screen', () => {
    fixture.detectChanges();
    const numberButtons = compiledDOM.querySelectorAll('button.numberButton');
    const button = numberButtons[5];
    const buttonText = button.textContent.trim();
    button.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual(buttonText);
  });

  it('should render multiple numbers pressed appended together on the screen', () => {
    fixture.detectChanges();
    const numberButtons = compiledDOM.querySelectorAll('button.numberButton');
    const button1 = numberButtons[5];
    button1.click();
    const button2 = numberButtons[2];
    button2.click();
    const button3 = numberButtons[6];
    button3.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.mainScreen').textContent)
      .toEqual(`${button1.textContent.trim()}${button2.textContent.trim()}${button3.textContent.trim()}`);
  });

  it('should clear text already entered on screen when clear button is pressed', () => {
    fixture.detectChanges();
    const numberButtons = compiledDOM.querySelectorAll('button.numberButton');
    const button1 = numberButtons[5];
    button1.click();
    const button2 = numberButtons[2];
    button2.click();
    const button3 = numberButtons[6];
    button3.click();
    fixture.detectChanges();
    compiledDOM.querySelector('button.clearButton').click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('');
  });

  it('should move text already entered on screen to superscript when plus button is pressed', () => {
    fixture.detectChanges();
    const numberButtons = compiledDOM.querySelectorAll('button.numberButton');
    const button1 = numberButtons[5];
    button1.click();
    const button2 = numberButtons[2];
    button2.click();
    const button3 = numberButtons[6];
    button3.click();
    fixture.detectChanges();
    compiledDOM.querySelector('button.plusButton').click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('');
    expect(compiledDOM.querySelector('.superScreen').textContent)
      .toEqual(`${button1.textContent.trim()}${button2.textContent.trim()}${button3.textContent.trim()}`);
  });

  it('should add newly entered number to previously entered number after + and = are clicked', () => {
    fixture.detectChanges();
    const twoButton = compiledDOM.querySelector('#button2');
    const fiveButton = compiledDOM.querySelector('#button5');
    const zeroButton = compiledDOM.querySelector('#button0');
    twoButton.click();
    fiveButton.click();
    zeroButton.click();
    fixture.detectChanges();
    compiledDOM.querySelector('button.plusButton').click();
    fixture.detectChanges();
    const sixButton = compiledDOM.querySelector('#button6');
    const fourButton = compiledDOM.querySelector('#button4');
    sixButton.click();
    fourButton.click();
    fixture.detectChanges();
    compiledDOM.querySelector('button.equalsButton').click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual(`${250 + 64}`);
  });

  it('should clear superscript text when enter is pressed', () => {
    fixture.detectChanges();
    const twoButton = compiledDOM.querySelector('#button2');
    const fiveButton = compiledDOM.querySelector('#button5');
    const zeroButton = compiledDOM.querySelector('#button0');
    twoButton.click();
    fiveButton.click();
    zeroButton.click();
    compiledDOM.querySelector('button.plusButton').click();
    const sixButton = compiledDOM.querySelector('#button6');
    const fourButton = compiledDOM.querySelector('#button4');
    sixButton.click();
    fourButton.click();
    compiledDOM.querySelector('button.equalsButton').click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('');
  });

  it('should allow adding again after = was previously clicked', () => {
    fixture.detectChanges();
    const plusButton = compiledDOM.querySelector('button.plusButton');
    const equalsButton = compiledDOM.querySelector('button.equalsButton');

    const twoButton = compiledDOM.querySelector('#button2');
    twoButton.click();
    plusButton.click();
    const fiveButton = compiledDOM.querySelector('#button5');
    fiveButton.click();
    equalsButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('7');
    
    plusButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('7');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('');

    const sixButton = compiledDOM.querySelector('#button6');
    sixButton.click();
    equalsButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('13');    
  });


  it('should clear all previous results and add anew after clear is pressed', () => {
    fixture.detectChanges();
    const plusButton = compiledDOM.querySelector('button.plusButton');
    const equalsButton = compiledDOM.querySelector('button.equalsButton');

    const twoButton = compiledDOM.querySelector('#button2');
    twoButton.click();
    plusButton.click();
    const fiveButton = compiledDOM.querySelector('#button5');
    fiveButton.click();
    equalsButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('7');
    
    compiledDOM.querySelector('button.clearButton').click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('');

    const sixButton = compiledDOM.querySelector('#button6');
    sixButton.click();
    plusButton.click();
    const fourButton = compiledDOM.querySelector('#button4');
    fourButton.click();
    equalsButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('10');    
  });

  it('should allow chaining of multiple +s together', () => {
    fixture.detectChanges();
    const plusButton = compiledDOM.querySelector('button.plusButton');
    const equalsButton = compiledDOM.querySelector('button.equalsButton');

    const twoButton = compiledDOM.querySelector('#button2');
    twoButton.click();
    plusButton.click();
    const fiveButton = compiledDOM.querySelector('#button5');
    fiveButton.click();
    plusButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('7');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('');

    const sixButton = compiledDOM.querySelector('#button6');
    sixButton.click();
    plusButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('13');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('');

    const fourButton = compiledDOM.querySelector('#button4');
    fourButton.click();
    equalsButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('17');    
  });

  it('should start and perform a new calculation if new numbers are entered right after =', () => {
    fixture.detectChanges();
    const plusButton = compiledDOM.querySelector('button.plusButton');
    const equalsButton = compiledDOM.querySelector('button.equalsButton');

    const twoButton = compiledDOM.querySelector('#button2');
    twoButton.click();
    plusButton.click();
    const fiveButton = compiledDOM.querySelector('#button5');
    fiveButton.click();
    equalsButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('7');
    
    const sixButton = compiledDOM.querySelector('#button6');
    sixButton.click();
    twoButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('62');
    plusButton.click();
    const fourButton = compiledDOM.querySelector('#button4');
    fourButton.click();
    equalsButton.click();
    fixture.detectChanges();
    expect(compiledDOM.querySelector('.superScreen').textContent).toEqual('');
    expect(compiledDOM.querySelector('.mainScreen').textContent).toEqual('66');    
  });
});
