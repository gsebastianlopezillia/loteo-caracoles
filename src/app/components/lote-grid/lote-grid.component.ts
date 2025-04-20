import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lote } from '../../lote.model';
import { APIService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lote-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './lote-grid.component.html',
  styleUrls: ['./lote-grid.component.scss']
})
export class LoteGridComponent implements OnInit, AfterViewInit {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  
  lotes: Lote[] = [];
  ordenarPor: string = 'precio';
  showLeftArrow: boolean = false;
  showRightArrow: boolean = true;
  scrollAmount: number = 300;
  currentIndex: number = 0;

  constructor(
    private apiService: APIService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cargarLotes();
  }

  ngAfterViewInit(): void {
    this.checkArrows();
    this.setupScrollSnap();
  }

  cargarLotes(): void {
    this.apiService.getLotes().subscribe({
      next: (data) => {
        this.lotes = data.map((lote: Partial<Lote>) => new Lote(lote));
        this.ordenarLotes({ target: { value: this.ordenarPor } } as unknown as Event);
        setTimeout(() => {
          this.checkArrows();
          this.updateCurrentIndex();
        }, 100);
      },
      error: (error) => {
        console.error('Error al cargar los lotes:', error);
      }
    });
  }

  ordenarLotes($event: Event): void {
    const criterio = ($event.target as HTMLSelectElement).value;
    this.ordenarPor = criterio;
    this.lotes.sort((a, b) => {
      switch (criterio) {
        case 'precio':
          return (a.precio || 0) - (b.precio || 0);
        case 'superficie':
          return (a.superficie || 0) - (b.superficie || 0);
        default:
          return 0;
      }
    });
  }

  scrollLeft(): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      container.scrollLeft -= this.scrollAmount;
    }
  }

  scrollRight(): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      container.scrollLeft += this.scrollAmount;
    }
  }

  scrollToIndex(index: number): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      const cardWidth = 300 + 16; // Ancho de la tarjeta + gap
      container.scrollLeft = index * cardWidth;
      this.currentIndex = index;
    }
  }

  onScroll(): void {
    this.checkArrows();
    this.updateCurrentIndex();
  }

  private checkArrows(): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      this.showLeftArrow = container.scrollLeft > 0;
      this.showRightArrow = container.scrollLeft < (container.scrollWidth - container.clientWidth);
    }
  }

  private updateCurrentIndex(): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      const cardWidth = 300 + 16; // Ancho de la tarjeta + gap
      this.currentIndex = Math.round(container.scrollLeft / cardWidth);
    }
  }

  private setupScrollSnap(): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      let isScrolling: any;
      
      container.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          this.updateCurrentIndex();
        }, 66);
      }, { passive: true });
    }
  }

  getSafePhotoUrl(foto: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(foto);
  }

  contactar(): void {
    const mensaje = 'Hola, me interesan los lotes disponibles. ¿Podrías darme más información?';
    window.open(`https://wa.me/3764165357?text=${encodeURIComponent(mensaje)}`, '_blank');
  }
} 