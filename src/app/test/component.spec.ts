import { TestBed, ComponentFixture, fakeAsync, async } from "@angular/core/testing";
import { ProductComponent } from '../component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('ProductComponent', () =>
{
   let fixture: ComponentFixture<ProductComponent>;
   let debugElement: DebugElement;

   function getHtmlElement(selector)
   {
      return debugElement.query(By.css(selector)).nativeElement;
   }

   beforeEach(function ()
   {
      TestBed.configureTestingModule({
         declarations: [ProductComponent],
         imports: [FormsModule]
      });

      fixture = TestBed.createComponent(ProductComponent);
      debugElement = fixture.debugElement;
      fixture.detectChanges();

   })

   describe('Understanding One-Way Data Bindings', () =>
   {
      it('data should flow from expression (getClasses()) to target (ngClass)', () =>
      {
         const hostElement: HTMLElement = getHtmlElement('#id1');
         expect(hostElement.className).toEqual('bg-success');

      });

      it('should set correct classes', () =>
      {
         const parent: HTMLElement = getHtmlElement('div');
         fixture.detectChanges();

         expect(parent.children[0].className).toEqual('p-2 bg-warning');
         expect(parent.children[1].className).toEqual('p-2 bg-info');
      });

      describe('Using the Standard Property Binding', () =>
      {
         it('should assign data for property', () =>
         {
            const hostElement: HTMLInputElement = debugElement.query(By.css('#id2 > input')).nativeElement;
            expect(hostElement.value).toEqual('Kayak');
         });
      });

      describe('Using the String Interpolation Binding', () =>
      {
         it('should set correct text', () =>
         {
            const parent: HTMLElement = getHtmlElement('div');
            fixture.detectChanges();

            expect(parent.children[0].textContent).toEqual(' The first product is Kayak. ');
            expect(parent.children[1].textContent).toEqual(' The second product is Lifejacket ');
         });
      });

      describe('Using the Attribute Binding', () =>
      {
         it('should set attribute', () =>
         {
            const td: HTMLTableDataCellElement = debugElement.query(By.css('TD[colspan="5"]')).nativeElement;
            expect(td.attributes['colspan'].value).toEqual('5');
         });
      });

      describe('Setting All of an Element’s Classes with the Standard Binding', () =>
      {
         it('should add class to existing one', () =>
         {
            const parent: HTMLElement = getHtmlElement('#id3');
            expect(parent.children[0].className).toEqual('existing class bg-success');
         });

         it('should add class', () =>
         {
            const parent: HTMLElement = getHtmlElement('#id3');
            expect(parent.children[1].className).toEqual('bg-success');
         });
      });

      describe('Setting Individual Classes Using the Special Class Binding', () =>
      {
         it('should add special class to existing one', () =>
         {
            const parent: HTMLElement = getHtmlElement('#id4');
            expect(parent.className).toEqual('p-2 bg-success');
         });
      });

      describe('Setting Classes Using the ngClass Directive', () =>
      {
         it('should assign class from object', () =>
         {
            const parent: HTMLElement = getHtmlElement('#id5');
            expect(parent.children[0].className).toEqual('p-2 text-center bg-danger');
            expect(parent.children[1].className).toEqual('p-2 bg-info');
            expect(parent.children[2].className).toEqual('p-2 bg-success');

         });
      });

      describe('Setting a Single Style Property', () =>
      {
         it('should assign style', () =>
         {
            const parent: HTMLElement = getHtmlElement('#id6');
            expect(parent.children[0].children[0].attributes["style"].value).toEqual('font-size: 30px;');
            expect(parent.children[1].children[0].attributes["style"].value).toEqual('font-size: 30px;');
         });
      });

      describe('Setting Styles Using the ngStyle Directive', () =>
      {
         it('should assign style', () =>
         {
            const parent: HTMLElement = getHtmlElement('#id7');
            expect(parent.children[0].children[0].attributes["style"].value).toEqual('font-size: 30px; margin: 100px; color: red;');
            expect(parent.children[1].children[0].attributes["style"].value).toEqual('font-size: 30px; margin: 100px; color: green;');

         });
      });
   });

   describe('Using the Structural Built-in Directives', () =>
   {
      describe('Using the ngIf Directive', () =>
      {
         it('div should be defined', () =>
         {
            const parent: HTMLElement = getHtmlElement('#id8');
            expect(parent.children[1].textContent).toEqual(' There are more than 4 products in the model ');
         });

         it('div should be undefined', () =>
         {
            const parent: HTMLElement = getHtmlElement('#id8');
            expect(parent.children[2]).toBeUndefined();
         });
      });

      describe('Using the ngSwitch Directive', () =>
      {
         it('should chooses correct case', () =>
         {
            const parent: HTMLElement = getHtmlElement('#id9');
            expect(parent.children[1].children[0].textContent).toEqual('There are five products');
         });
      });

      describe('Using the ngFor Directive', () =>
      {
         it('should has rows', () =>
         {
            const table: HTMLTableElement = debugElement.query(By.css('#id10 > table')).nativeElement;;
            expect(table.rows.length).toEqual(6);
         });

         it('should have index value', () =>
         {
            const table: HTMLTableElement = debugElement.query(By.css('#id11 > table')).nativeElement;;
            expect(table.rows.item(1).innerText).toEqual('1	Kayak	Watersports	275');
            expect(table.rows.item(2).innerText).toEqual('2	Lifejacket	Watersports	48.95');
         });

         it('should have Odd and Even Values', () =>
         {
            const table: HTMLTableElement = debugElement.query(By.css('#id12 > table')).nativeElement;;
            expect(table.rows.item(1).className).toEqual('text-white bg-info');
            expect(table.rows.item(2).className).toEqual('text-white bg-primary');

         });
      });

      describe('Using the ngTemplateOutlet Directive', () =>
      {

      });
   });

   describe('Using the Event Binding', () =>
   {
      it('should change text in div when mouse over specific table cell', () =>
      {
         const cell: HTMLTableElement = debugElement.query(By.css('#id13 > table tr:nth-child(2) td:nth-child(1)')).nativeElement;
         const cellDebugElement: DebugElement = debugElement.query(By.css('#id13 > table tr:nth-child(2) td:nth-child(1)'));
         const divElement: HTMLDivElement = debugElement.query(By.css('#id13')).nativeElement.children[0];

         expect(cell.textContent).toEqual('1');
         cellDebugElement.triggerEventHandler('mouseover', new Event('mouseover'));
         fixture.detectChanges();
         expect(divElement.textContent).toEqual(' Selected Product: Kayak ');
      });

      it('should highlight row when mouse over that row', () =>
      {
         const trDebugElement: DebugElement = debugElement.query(By.css('#id14 > table tr:nth-child(2)'));
         const trElement: HTMLTableRowElement = trDebugElement.nativeElement;

         trDebugElement.triggerEventHandler('mouseover', new Event('mouseover'));
         fixture.detectChanges();

         expect(trElement.textContent).toEqual('1KayakWatersports275');
         expect(trElement.className).toEqual('bg-info');
      });

      describe('Inputs', () =>
      {
         it('should has input value', () =>
         {
            const inputEl: DebugElement = debugElement.query(By.css('#id15 input'));
            const debugEl: DebugElement = debugElement.query(By.css('#id15'));
            inputEl.nativeElement.value = 'Kayak2';

            inputEl.triggerEventHandler('input', { target: inputEl.nativeElement })
            fixture.detectChanges();

            expect((debugEl.children[0].nativeElement as HTMLDivElement).textContent).toEqual(' Selected Product: Kayak2 ')
         });

         it('should has input value', () =>
         {
            const inputEl: DebugElement = debugElement.query(By.css('#id16 input'));
            const debugEl: DebugElement = debugElement.query(By.css('#id16'));
            inputEl.nativeElement.value = 'Kayak3';

            inputEl.triggerEventHandler('input', { target: inputEl.nativeElement })
            fixture.detectChanges();

            expect((debugEl.children[0].nativeElement as HTMLDivElement).textContent).toEqual(' Selected Product: Kayak3 ')
         });

      });
   });

   describe('Using Two-Way Data Bindings', () =>
   {
      describe('Using the ngModel Directive', () =>
      {
         it('should text and iput', () =>
         {
            const inputEl: DebugElement = debugElement.query(By.css('#id17 div:nth-child(3) input'));
            const inputEl1: DebugElement = debugElement.query(By.css('#id17 div:nth-child(2) input'));

            const debugEl: DebugElement = debugElement.query(By.css('#id17'));
            inputEl.nativeElement.value = 'Kayak4';

            inputEl.triggerEventHandler('input', { target: inputEl.nativeElement })
            fixture.detectChanges();

            expect((debugEl.children[0].nativeElement as HTMLDivElement).textContent).toEqual(' Selected Product: Kayak4 ')
            expect((inputEl1.nativeElement as HTMLInputElement).value).toEqual('Kayak4')

         });

         it('[ngModel] should set text and input', () =>
         {
            const inputEl: DebugElement = debugElement.query(By.css('#id18 div:nth-child(3) input'));
            const debugEl: DebugElement = debugElement.query(By.css('#id18'));
            inputEl.nativeElement.value = 'Kayak4';

            inputEl.triggerEventHandler('input', { target: inputEl.nativeElement })
            fixture.detectChanges();

            expect((debugEl.children[0].nativeElement as HTMLDivElement).textContent).toEqual(' Selected Product: Kayak4 ')
         });
      });
   });
});
