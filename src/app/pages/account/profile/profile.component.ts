// Angular modules
import { CommonModule, NgIf }                 from '@angular/common';
import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';

// Services
import { StoreService }         from '@services/store.service';

// Components
import { ProgressBarComponent } from '@blocks/progress-bar/progress-bar.component';
import { PageLayoutComponent }  from '@layouts/page-layout/page-layout.component';
import { WalletConnectService } from '@services/wallet-connect.service';
import { PublicKeyRecoveryService } from '@services/public-key-recovery-service';

@Component({
  selector    : 'profile',
  templateUrl : './profile.component.html',
  styleUrls   : ['./profile.component.scss'],
  standalone  : true,
  imports     : [PageLayoutComponent, NgIf, ProgressBarComponent, CommonModule]
})
export class MyAccountComponent implements OnInit
{
  constructor
  (
    public walletconnectService : WalletConnectService,
    public publicKey : PublicKeyRecoveryService
  )
  { 
    publicKey.recoverPublicKey('0x876d5fd0ece30de0f8526951d2c348a3268260e57ffd7c49e4e80fd24b431400')
  }

  // -------------------------------------------------------------------------------
  // NOTE Init ---------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public ngOnInit() : void
  {

  }

  // -------------------------------------------------------------------------------
  // NOTE Actions ------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // NOTE Computed props -----------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // NOTE Helpers ------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // NOTE Requests -----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------
  // NOTE Subscriptions ------------------------------------------------------------
  // -------------------------------------------------------------------------------

}
