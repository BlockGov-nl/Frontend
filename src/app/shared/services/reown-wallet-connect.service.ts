import { Injectable } from '@angular/core';

import Onboard, { WalletState } from '@web3-onboard/core'
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'
import { WalletConnectState } from '@enums/wallets-connect-state.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { Cookies } from '@enums/cookbies.enum';

@Injectable({
  providedIn: 'root',
})
export class ReownWalletConnectService {
  private stateSubject: BehaviorSubject<WalletConnectState> = new BehaviorSubject<WalletConnectState>(WalletConnectState.Disconnected);
  public state$: Observable<WalletConnectState> = this.stateSubject.asObservable();
  private addressSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public address$: Observable<string> = this.addressSubject.asObservable();
 
  private chains= [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/<INFURA_KEY>'
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    }
  ]

  private onboard = Onboard({
    theme:"dark",
    wallets: [injectedModule()],
    chains: this.chains
  })

  constructor(private cookieService: CookieService) {
    this.restoreWalletConnectivity()
  }

  async restoreWalletConnectivity() {
    if(this.cookieService.get(Cookies.CONNECTED_WALLET_TYPE)) {
      console.info('A wallet was previously connected, trying to reconnect')
      this.stateSubject.next(WalletConnectState.Loading)

      const wallets = await this.onboard.connectWallet({
        autoSelect: {
          label: this.cookieService.get(Cookies.CONNECTED_WALLET_TYPE),
          disableModals: true
        }
      })

      this.processWalletStates(wallets)
    } else {
      this.stateSubject.next(WalletConnectState.Disconnected)
    }
  }

  async processWalletStates(wallets: WalletState[]): Promise<boolean> {
    if (wallets[0]) {
      this.addressSubject.next(wallets[0].accounts[0].address)
      this.stateSubject.next(WalletConnectState.Connected)
      console.log(`Connected to wallet ${await this.addressSubject.value}`)
      return true
    } else {
      console.log("Could connect to any wallets")
      this.stateSubject.next(WalletConnectState.Disconnected)
    }
    return false
  }


  // Connect wallet
  async connectWallet(): Promise<void> { 
    this.stateSubject.next(WalletConnectState.Loading)  
    const wallets = await this.onboard.connectWallet()
    const walletsProcessed = await this.processWalletStates(wallets)
    if (walletsProcessed) this.cookieService.set(Cookies.CONNECTED_WALLET_TYPE, wallets[0].label, 365)
  }

  async disconnectWallet(): Promise<void> {   
    this.onboard.disconnectWallet({label: this.cookieService.get(Cookies.CONNECTED_WALLET_TYPE)})
    this.cookieService.delete(Cookies.CONNECTED_WALLET_TYPE)
    this.stateSubject.next(WalletConnectState.Disconnected)
  }
}


