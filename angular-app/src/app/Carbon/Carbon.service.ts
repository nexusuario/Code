import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import {Carbon} from '../org.decentralized.energy.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CarbonService {

    //define namespace for energy calls
		private NAMESPACE: string = 'Carbon';
	
    //use data.service.ts to create services to make API calls
    constructor(private dataService: DataService<Carbon>) {
    };

    //get all carbon asset objects on the blockchain network
    public getAll(): Observable<Carbon[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    //get carbon asset by id
    public getAsset(id: any): Observable<Carbon> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    //add carbon asset
    public addAsset(itemToAdd: any): Observable<Carbon> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

}
