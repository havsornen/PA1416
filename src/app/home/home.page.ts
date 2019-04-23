import { Component, OnInit } from "@angular/core";
import { ApiServiceService } from "./../api-service.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  // url = "http://localhost:8080/demo/all";
  // api: Observable<any>;
  // constructor(private http: HttpClient) {
  //   /**
  //    * Get data from the SE Api service
  //    * map the result to return only the results that we need
  //    */
  //   this.api = this.http.get(
  //     "http://localhost:8080/demo/login?usr_email=someemail@someemailprovider.com&usr_password=123"
  //   );
  //   this.api.subscribe(data => {
  //     console.log("my data: ", data);
  //   });
  // }
  // ngOnInit() {
  //   console.log(ApiServiceService);
  // }
}
