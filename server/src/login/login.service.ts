import { ethers, EtherSymbol } from "ethers";
import { Injectable } from "@nestjs/common";
import { error } from "console";

//why?
const nonces = new Map<string, string>

@Injectable()
export class LoginService {
  generateNonce(address: string) {
    const nonce = Math.floor(Math.random() * 1000000).toString();
    nonces.set(address, nonce)

  }

  async verifySignature(address:string, signature:string) {
    const nonce = nonces.get(address);
    if (!nonce) {
      throw new Error('nonce not found')
    }
    const message = `login nonce: ${nonce}`;
    const recovered = ethers.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      throw new Error (' Invalid signature');
    }
  }

}