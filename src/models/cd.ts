export class Cd{

    description: string[];
    isLend: boolean;
    userName: string;
  
    constructor( public name: string) {
      this.description = [];
      this.isLend = false;
      this.userName='';
    }
  }