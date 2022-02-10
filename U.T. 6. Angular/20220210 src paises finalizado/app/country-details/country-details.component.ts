import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Country } from '../models/country';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  // @ts-ignore
  @Input('code') _countryCode: string;

  @Output('infoavailable') private _infoAvailableEmitter = new EventEmitter<void>();

  // @ts-ignore
  country$: Observable<Country>;

  constructor(
    private _countriesService: CountriesService,
    private _path: ActivatedRoute
  ) {
    const countryCode = this._path.snapshot.paramMap.get('code');

    const reportInfoReceivedFromEndpoint = tap(() => this._infoAvailableEmitter.emit())

    // @ts-ignore
    this.country$ = this._countriesService.retrieveCountryByCode$(countryCode).pipe(
      reportInfoReceivedFromEndpoint
    );
  }

  ngOnInit(): void {
  }

}
