import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-storage-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="storage-info">
      <h3>Local Storage Status</h3>
      <p>Storage is {{ hasStoredData ? 'Active' : 'Empty' }}</p>
      <p *ngIf="storageSize">Size: {{ storageSize }} characters</p>
      <button (click)="clearStorage()" *ngIf="hasStoredData">Clear Storage</button>
    </div>
  `,
  styles: [`
    .storage-info {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 1rem 0;
    }
    button {
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #c82333;
    }
  `]
})
export class StorageInfoComponent {
  hasStoredData = false;
  storageSize = 0;

  constructor(private storageService: StorageService) {
    this.checkStorage();
  }

  checkStorage(): void {
    const state = this.storageService.loadState();
    this.hasStoredData = !!state;
    if (state) {
      this.storageSize = JSON.stringify(state).length;
    }
  }

  clearStorage(): void {
    if (confirm('Are you sure you want to clear all stored data?')) {
      this.storageService.clearState();
      this.checkStorage();
      location.reload(); // Reload to reset the app state
    }
  }
}