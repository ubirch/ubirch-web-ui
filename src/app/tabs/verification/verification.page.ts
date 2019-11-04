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

  constructor(
    private truster: TrustService
  ) { }

  ngOnInit() {
  }

  private checkHash(event: any) {
    // existingHash = 'oPV/aJsximYq2DbduTEarm8Jhae4uy61xOB6JIAACnFBCDJjJjBvz1sQNlqEfEAeCq1q5Kl1bv6KGz1y2wKQRw==';
    // NotExistingHash = 'LFTeTv/CkXn4Y2DFWunC5i7VhUbfQvVXoJ7iNt4D5ad9udm4aXJBmhR6+UAODtXXqtzcu0tyRjTF4Sx/JJN2mg==';
      const hash = event.target.value;
      if (hash && hash.trim() !== '') {
        this.truster.verifyByHash(hash).subscribe(
          verification => console.log(verification)
        );
      } else {
        this.clearHashView();
      }
  }

  private clearHashView() {
    console.log('Clear...');
  }
}
