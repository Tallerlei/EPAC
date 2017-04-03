import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class GetXmlService {

  constructor(private http: Http) {

  }

  // gets specified (url) xml file and returns it as a promise
  getXmlFile(url: string){
    return this.http.get(url).map(res => {
      return res;
    }).toPromise();
  }

  createXmlStructure(xmlAsText){
    let parser = new DOMParser();
    return parser.parseFromString(xmlAsText, "text/xml");
  }


}
