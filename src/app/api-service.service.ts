import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class ApiServiceService {
  url = "http://localhost:8080/demo/all";
  films: Observable<any>;
  constructor(private http: HttpClient) {
    /**
     * Get data from the SE Api service
     * map the result to return only the results that we need
     */
    // this.films = this.http.get("http://localhost:8080/demo/all");
    console.log((this.films = this.http.get("http://localhost:8080/demo/all")));
    // this.films.subscribe(data => {
    //   console.log("my data: ", data);
    // });
  }
}
