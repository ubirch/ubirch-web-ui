import { Component, OnInit } from '@angular/core';
import {HeaderActionButton} from '../../components/header/header-action-button';
import {TrustService} from '../../services/trust.service';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  public headerRightLabel = 'Verified Hash: ';
  public headerRightValue = '..';

  actionButtons = [new HeaderActionButton({
    color: 'dark',
    label: 'Check hash',
    iconPath: 'assets/app-icons/checkmark-circle-outline.svg',
    action: 'checkHash'
  })];

  handleButtonClick(action: string) {
    switch (action) {
      case 'checkHash':
        this.checkHash();
        break;
    }
  }

  constructor(
    private truster: TrustService
  ) { }

  ngOnInit() {
  }

  private checkHash() {
    const existingHash = 'oPV/aJsximYq2DbduTEarm8Jhae4uy61xOB6JIAACnFBCDJjJjBvz1sQNlqEfEAeCq1q5Kl1bv6KGz1y2wKQRw==';
    // 'LFTeTv/CkXn4Y2DFWunC5i7VhUbfQvVXoJ7iNt4D5ad9udm4aXJBmhR6+UAODtXXqtzcu0tyRjTF4Sx/JJN2mg==';
    this.truster.verifyByHash(existingHash).subscribe(
      verification => console.log(verification)
    );
  }
}
