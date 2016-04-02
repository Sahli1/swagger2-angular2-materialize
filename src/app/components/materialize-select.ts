
import {ElementRef,Input,EventEmitter,Output,AfterViewInit} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

export abstract class MaterializeSelect implements AfterViewInit {
    model:any;
    selectValueChange: EventEmitter<any>;
    private selectInput:any;
    private multiple:boolean;
    constructor(el: ElementRef,selectValueChange: EventEmitter<any>,multiple:boolean = false) {
        this.multiple = multiple;
        this.selectValueChange = selectValueChange;
    }
    ngAfterViewInit():void {
        this.selectInput = $(DOM.querySelector(this.el.nativeElement,'select'));

        let divParent:any = $(DOM.querySelector(this.el.nativeElement,'.input-field'));
        divParent.on('change', 'select', () => {
            console.log('input changed',this.selectInput.val());
            this.onChangeValue();
            this.updateValue(this.selectInput.val());
        });
    }
    updateValue(value:string):void {
        this.model.selected = value;
        this.selectValueChange.emit(this.model);
    }
    isSelected(value:string):boolean {
        return false;
    }
    abstract onChangeValue():void;
}