import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockSymbolService } from '../../core/services/stock-symbol.service';
import { StockSymbol } from '../model/stock-symbol';

@Component({
  selector: 'app-form-symbol',
  templateUrl: './form-symbol.component.html',
  styleUrls: ['./form-symbol.component.css'],
})
export class FormSymbolComponent implements OnInit {
  stockForm: FormGroup<StockSymbol>;

  constructor(
    private formBuilder: FormBuilder,
    private stockSymbolService: StockSymbolService
  ) {}

  ngOnInit() {
    this.initialiseForm();
  }

  initialiseForm() {
    this.stockForm = this.formBuilder.group({
      symbolStock: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });
  }

  onSubmit() {
    const formValue = this.stockForm.value;
    this.stockSymbolService.sendSymbolToLocalStorage(formValue);
  }
}
