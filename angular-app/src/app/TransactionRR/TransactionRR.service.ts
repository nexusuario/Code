import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import { Resident } from '../org.decentralized.energy.network';
import { Coins } from '../org.decentralized.energy.network';
import { Carbon } from '../org.decentralized.energy.network';
import { CarbonToCoins } from '../org.decentralized.energy.network';

import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TransactionRRService {

    //define namespace strings for api calls
	  private RESIDENT: string = 'Resident';
    private CARBON: string = 'Carbon';
    private COINS: string = 'Coins';
    private CARBON_TO_COINS: string = 'CarbonToCoins';

    //use data.service.ts to create services to make API calls
    constructor(private residentService: DataService<Resident>, private coinsService: DataService<Coins>, private carbonService: DataService<Carbon>, private carbonToCoinsService: DataService<CarbonToCoins>) {
    };

    //get all resident objects on the blockchain network
    public getAllResidents(): Observable<Resident[]> {
        return this.residentService.getAll(this.RESIDENT);
    }

    //get carbon asset by id
    public getCarbon(id: any): Observable<Carbon> {
      return this.carbonService.getSingle(this.CARBON, id);
    }

    //get coins asset by id
    public getCoins(id: any): Observable<Coins> {
      return this.coinsService.getSingle(this.COINS, id);
    }
   
    //create CARBON to coins transaction
    public carbonToCoins(itemToAdd: any): Observable<CarbonToCoins> {
      return this.carbonToCoinsService.add(this.CARBON_TO_COINS, itemToAdd);
    }

}
