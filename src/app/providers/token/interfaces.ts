import decoder from "jwt-decode";

export class Token {
  public id: string;
  public userId: string;
  public roleId: string;
  public email: string;
  public name: string;

  constructor(token:any){
    const _token: any = decoder(token);
    this.id = token;
    this.userId = _token.userId;
    this.roleId = _token.roleId;
    this.email = _token.email;
    this.name = _token.name;
  }

  public set(token:any):void{
    const _token: any = decoder(token.token);
    this.id = token;
    this.userId = _token.userId;
  }
}

