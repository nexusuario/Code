import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CarbonService } from './Carbon.service';
import 'rxjs/add/operator/toPromise';

//provide associated components
@Component({
	selector: 'app-Carbon',
	templateUrl: './Carbon.component.html',
	styleUrls: ['./Carbon.component.css'],
  providers: [CarbonService]
})

//CarbonComponent class
export class CarbonComponent implements OnInit {

  //define variables
  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  //initialize form variables
  carbonID = new FormControl("", Validators.required);
  units = new FormControl("", Validators.required);
  value = new FormControl("", Validators.required);
  ownerID = new FormControl("", Validators.required);
  ownerEntity = new FormControl("", Validators.required);
  
  //intialize form
  constructor(private serviceCarbon:CarbonService, fb: FormBuilder) {
    this.myForm = fb.group({
          carbonID:this.carbonID,
          units:this.units,
          value:this.value,
          ownerID:this.ownerID,
          ownerEntity:this.ownerEntity        
    });
  };

  //on page initialize, load all energy assets
  ngOnInit(): void {
    this.loadAll();
  }

  //load all energy assets on the blockchain network
  loadAll(): Promise<any> {
    
    //retrieve all energy assets in the tempList array
    let tempList = [];

    //call serviceEnergy to get all energy asset objects
    return this.serviceCarbon.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      
      //append tempList with the energy asset objects returned
      result.forEach(asset => {
        tempList.push(asset);
      });

      //assign tempList to allAssets
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  //add energy asset
  addAsset(form: any): Promise<any> {

    //define energy asset object
    this.asset = {
      $class: "org.decentralized.energy.network.Carbon",
          "carbonID":this.carbonID.value,
          "units":this.units.value,
          "value":this.value.value,
          "ownerID":this.ownerID.value,
          "ownerEntity":this.ownerEntity.value        
    };

    //update form
    this.myForm.setValue({      
          "carbonID":null,
          "units":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null
    });

    //call serviceEnergy to add energy asset
    return this.serviceCarbon.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      
      //update form
      this.myForm.setValue({
          "carbonID":null,
          "units":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null 
        
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  //set id
  setId(id: any): void{
    this.currentId = id;
  }

  //get form based on energyID
  getForm(id: any): Promise<any>{

    //call serviceEnergy to get energy asset object
    return this.serviceCarbon.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
            "carbonID":null,
            "units":null,
            "value":null,
            "ownerID":null,
            "ownerEntity":null 
      };
      
      //update formObject
      if(result.carbonID){
        formObject.carbonID = result.carbonID;
      }else{
        formObject.carbonID = null;
      }
    
      if(result.units){
        formObject.units = result.units;
      }else{
        formObject.units = null;
      }
    
      if(result.value){
        formObject.value = result.value;
      }else{
        formObject.value = null;
      }
    
      if(result.ownerID){
        formObject.ownerID = result.ownerID;
      }else{
        formObject.ownerID = null;
      }
    
      if(result.ownerEntity){
        formObject.ownerEntity = result.ownerEntity;
      }else{
        formObject.ownerEntity = null;
      }
      
      //set formObject
      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  //reset form
  resetForm(): void{
    this.myForm.setValue({
          "carbonID":null,
          "units":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null 
      });
  }

}
