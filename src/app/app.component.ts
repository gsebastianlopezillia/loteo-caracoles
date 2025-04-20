import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { APIService } from './api.service';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { Lote } from './lote.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoteGridComponent } from './components/lote-grid/lote-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    MatIconModule, 
    MatButtonModule,
    LoteGridComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'loteo-caracoles';
  videoUrl: SafeResourceUrl;
  // Signals para estado reactivo
  lotes = signal<Lote[]>([]);
  filter = signal<string>('');
  isMobile = signal<boolean>(false);

  // Computed para filtrar lotes automáticamente
  lotesFiltrados = computed(() => {
    const filterValue = this.filter().toLowerCase();
    return this.lotes().filter(lote =>
      String(lote.id).toLowerCase().includes(filterValue) ||
      String(lote.manzana).toLowerCase().includes(filterValue) ||
      lote.superficie?.toString().includes(filterValue) ||
      lote.precio?.toString().includes(filterValue) ||
      String(lote.calle).toLowerCase().includes(filterValue) ||
      String(lote.estado).toLowerCase().includes(filterValue)
    );
  });


  public imageCards = [
    {
      title: "Conecta con la naturaleza",
      url: "assets/images/img-card-1.png"
    },
    {
      title: "Caminos mantenidos",
      url: "assets/images/img-card-2.png"
    },
    {
      title: "Límites claros",
      url: "assets/images/img-card-3.png"
    },
    {
      title: "Flora autóctona",
      url: "assets/images/img-card-4.png"
    },
    {
      title: "Fauna silvestre",
      url: "assets/images/img-card-5.png"
    },
    {
      title: "Noches soñadas",
      url: "assets/images/img-card-6.png"
    }
  ]

  // Static FAQs
  public faqs = [
    {
      pregunta: '¿Es apto crédito?',
      respuesta: 'Sí s apto crédito hipotecario.',
    },
    {
      pregunta: '¿Se puede financiar?',
      respuesta: 'No financiamos, pero aceptamos permuta por vehículo.',
    },
    {
      pregunta: '¿Cuándo puedo empezar a construir?',
      respuesta: 'De inmediato, toda la documentación se encuentra en regla y los servicios están disponibles.',
    },
    {
      pregunta: '¿Qué tipo de suelo es?',
      respuesta: 'Es suelo 6a, elevado con pendiente suave.',
    },
    {
      pregunta: '¿Es bañado?',
      respuesta: 'No, es zona NO inundable por la altura, pendiente y tipo de suelo.',
    },
  ];

  constructor(
    private apiService: APIService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    public sanitizer: DomSanitizer
  ) {
    const youtubeId = 'Gpv1sWGmM-E'; // Reemplaza con el ID real del video
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${youtubeId}`
    );

  }

  ngOnInit(): void {
    this.loadLotes();
    this.setupBreakpointObserver();
  }

  getSafePhotoUrl(foto: string): SafeUrl {
    // Aquí deberías reemplazar con la URL directa que obtuviste
    return this.sanitizer.bypassSecurityTrustUrl(foto);
  }

  private loadLotes(): void {
    this.apiService.getLotes().subscribe({
      next: (data) => {
        // console.log('(°-°) getLotes', data);
        // Convertimos los datos en instancias de Lote
        const lotesMapped = data.map((lote: Partial<Lote> | undefined) => new Lote(lote));
        this.lotes.set(lotesMapped);
      },
      error: (err) => {
        console.error('Error al cargar los lotes:', err);
        this.lotes.set([]); // En caso de error, seteamos un arreglo vacío
      }
    });
  }

  private setupBreakpointObserver(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
  }

  abrirModal(loteId: string, event: MouseEvent): void {
    const path = event.composedPath();
    if (path.some((el: any) => el.className?.includes('mat-raised-button'))) {
      return;
    }

    const lote = this.lotes().find(l => l.id === loteId);
    if (lote) {
      this.dialog.open(DetailModalComponent, {
        data: { lote, images: lote.fotos },
        width: '100vw !important',
        panelClass: 'custom-dialog-panel',
        height: '100vw !important'
      });
    }
  }

  abrirWhatsApp(loteNombre?: string, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const mensaje = loteNombre
      ? `Hola, estoy interesado en el ${loteNombre}. ¿Podrías darme más información?`
      : 'Hola, estoy interesado en un lote para mi casa de fin de semana. ¿Podrías darme más información?';
    window.open(
      `https://wa.me/3764165357?text=${encodeURIComponent(mensaje)}`,
      '_blank'
    );
  }
}