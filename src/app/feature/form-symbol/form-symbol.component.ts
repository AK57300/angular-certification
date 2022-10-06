import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../core/services/stock.service';
import { StockSymbol } from '../shared/model/stock-symbol';

@Component({
  selector: 'app-form-symbol',
  templateUrl: './form-symbol.component.html',
  styleUrls: ['./form-symbol.component.css'],
})
export class FormSymbolComponent implements OnInit {
  stockForm: FormGroup<StockSymbol>;

  @Output() addEventEmitter = new EventEmitter<string>;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService
  ) {}

  ngOnInit() {
    this.initialiseForm();
  }

  initialiseForm() : void {
    this.stockForm = this.formBuilder.group({
      symbolStock: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });
  }

  onSubmit() : void {
    const formValue = this.stockForm.value;
    this.stockService.sendSymbolToLocalStorage(formValue);
    this.addEventEmitter.emit(formValue['symbolStock']);
  }
}
