import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class PublicKeyRecoveryService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    // Replace with your actual provider URL
    this.provider = new ethers.JsonRpcProvider(
      'https://ethereum-sepolia-rpc.publicnode.com'
    );
  }

  /**
   * Recovers the public key from a signed Ethereum transaction using @noble/secp256k1.
   * @param txHash The hash of the transaction.
   * @returns A Promise that resolves to the public key (in hex format).
   */
  async recoverPublicKey(txHash: string): Promise<string | null> {
    try {
      // Fetch the transaction by hash
      const tx = await this.provider.getTransaction(txHash);
      if(tx) {
        const transactionHash = tx.hash
        const signature = tx.signature.serialized
        console.log("Transaction address: " + tx.from)
        
      

        // console.log('public key  :', publicKey.toHex());
        // const address = keccak256(publicKey.toRawBytes().slice(0)).slice(-20);
        // console.log('address     :', '0x' + address);
      }


      return ""
    } catch (error) {
      console.error('Error recovering public key from transaction:', error);
      return null;
    }
  }
}
