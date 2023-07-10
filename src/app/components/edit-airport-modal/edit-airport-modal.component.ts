import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Airport } from './IAirport';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-edit-airport-modal',
  templateUrl: './edit-airport-modal.component.html'
})
export class EditAirportModalComponent {
  airport: Airport = {
    id: 0,
    name: '',
    code: '',
    city: '',
    country: ''
  }

  frm: FormGroup;
  countryList: any[] = [];
  cityList: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private formBuilder: FormBuilder) {
    this.getCountries()
    this.getCities(data.country)

    this.airport = data
    console.log(this.airport);
    this.frm = formBuilder.group({
      airportName: [this.airport.name],
      airportCode: [this.airport.code],
      airportCity: [this.airport.city],
      airportCountry: [this.airport.country],
    })

    this.frm.get("airportCountry")?.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
        this.getCities(data);
        this.frm.get("airportCity")?.enable()
      }
    })

    this.frm.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  async deleteAirport() {
    const confirmDeletion = window.confirm("Are you sure delete this airport record");
    if (confirmDeletion) {
      await axios.delete(`http://localhost:8080/api/airports/${this.airport.id}`)
      console.log(this.airport.id);
    }
  }

  async changeAirport() {
    const confirmUpdate = window.confirm("Are you sure change this airport record");
    const { airportName, airportCode, airportCity, airportCountry } = this.frm.value;
    if (confirmUpdate) {
      await axios.put(`http://localhost:8080/api/airports`, {
        id: this.airport.id,
        name: airportName,
        code: airportCode,
        city: airportCity,
        country: airportCountry
      })

    }
  }

  async getCities(country: string) {
    const cityResponse = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", { country: country })
    this.cityList = cityResponse.data.data
    console.log(cityResponse.data.data);
  }

  async getCountries() {
    const countryResponse = await axios.get("https://countriesnow.space/api/v0.1/countries");
    this.countryList = countryResponse.data.data
  }
}
