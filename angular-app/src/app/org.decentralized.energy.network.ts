import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.decentralized.energy.network{
   export class Resident extends Participant {
      residentID: string;
      firstName: string;
      lastName: string;
      carbon: Carbon;
      coins: Coins;
      cash: Cash;
      energy: Energy;
   }
   export class Bank extends Participant {
      bankID: string;
      name: string;
      coins: Coins;
      cash: Cash;
   }
   export class UtilityCompany extends Participant {
      utilityID: string;
      name: string;
      coins: Coins;
      energy: Energy;
   }
   export enum OwnerEntity {
      Resident,
      Bank,
      UtilityCompany,
   }

   export class Carbon extends Asset {
      carbonID: string;
      units: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class Coins extends Asset {
      coinsID: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class Energy extends Asset {
      energyID: string;
      units: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class Cash extends Asset {
      cashID: string;
      currency: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class EnergyToCoins extends Transaction {
      energyRate: number;
      energyValue: number;
      coinsInc: Coins;
      coinsDec: Coins;
      energyInc: Energy;
      energyDec: Energy;
   }
   export class CarbonToCoins extends Transaction {
      carbonRate: number;
      carbonValue: number;
      coinsInc: Coins;
      coinsDec: Coins;
      carbonInc: Carbon;
      carbonDec: Carbon;
   }
   export class CashToCoins extends Transaction {
      cashRate: number;
      cashValue: number;
      coinsInc: Coins;
      coinsDec: Coins;
      cashInc: Cash;
      cashDec: Cash;
   }   
// }
