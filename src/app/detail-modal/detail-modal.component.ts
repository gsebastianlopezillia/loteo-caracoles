import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { register } from 'swiper/element/bundle';
import { Lote } from '../lote.model';

@Component({
  selector: 'app-detail-modal',
  imports: [
    MatDialogModule,
    CommonModule,
    MatButton
  ],
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DetailModalComponent implements OnInit{
  images: string[];
  lote: Lote;

  constructor(
    public dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lote:Lote, images: string[] }
  ) {
    this.images = data.images;
    this.lote = data.lote;
  }


  ngOnInit(): void {
    register();
  }

  close(): void {
    this.dialogRef.close();
  }
}
