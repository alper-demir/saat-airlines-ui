import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-new-airport-modal',
  templateUrl: './new-airport-modal.component.html'
})
export class NewAirportModalComponent implements OnInit {
  countryList: any[] = [];
  cityList: any[] = [];
  frm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      airportName: [""],
      airportCode: [""],
      airportCity: [""],
      airportCountry: [""],
    })

    this.frm.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
      }
    })

    this.frm.get("airportCountry")?.valueChanges.subscribe({ // ülke bilgisi her değiştiğinde seçilen ülkenin şehirlerini getir.
      next: (data) => {
        console.log(data);
        this.getCities(data);
        this.frm.get("airportCity")?.enable()
      }
    })
  }

  async getCities(city: string) {
    const cityResponse = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", { country: city })
    this.cityList = cityResponse.data.data
    console.log(cityResponse.data.data);
  }

  async ngOnInit(): Promise<void> {
    this.frm.get("airportCity")?.disable()
    const countryResponse = await axios.get("https://countriesnow.space/api/v0.1/countries");
    this.countryList = countryResponse.data.data
    console.log(countryResponse.data.data);
  }

  async onSubmit() {
    console.log(this.frm.value);
    console.log(this.frm.valid);
    const confirm = window.confirm("Are you sure?")
    if(confirm){
      const { airportName, airportCode, airportCity, airportCountry } = this.frm.value;
      const response = await axios.post("http://localhost:8080/api/airports/add", {
        name: airportName,
        code: airportCode,
        city: airportCity,
        country: airportCountry
      })
      console.log(response);
    }
    
  }
}
