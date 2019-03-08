import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from 'src/models/Material';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.sass']
})
export class MaterialsComponent implements OnInit {
  materials$: Observable<Material[]>;
  barWidth: number;
  isAddNewPanel: boolean;
  selectedMaterial: Material;
  selectedMaterialIndex: number;

  constructor(private db: DatabaseService) {
    this.materials$ = this.db.getMaterials();
    this.selectedMaterialIndex = 0;
    this.barWidth = 700;
  }

  ngOnInit() {
    this.materials$.subscribe(suppliers => {
      this.selectedMaterial = suppliers[this.selectedMaterialIndex];
    });
  }

  updateSelectedMaterial(material: Material, index: number) {
    this.selectedMaterial = material;
    this.selectedMaterialIndex = index;
  }

  renderQuantityBar(material: Material) {
    return 'M 0 0 H ' + this.barWidth.toString();
  }

  renderProcessedBar(material: Material) {
    return 'M 0 0 H ' + (material.processed / material.quantity) * this.barWidth;
  }

  renderDeliveredBar(material: Material) {
    return 'M 0 0 H ' + (material.delivered / material.quantity) * this.barWidth;
  }

  showAddPanel() {
    this.isAddNewPanel = !this.isAddNewPanel;
  }

  addMaterial(form: Material) {
    const material = new Material(form.name, form.unit);
    this.db.addMaterial(material);
  }

  removeMaterial(material: Material) {
    this.db.removeMaterial(material);
  }

  processedChanged(element: Material, input: HTMLInputElement) {
    this.db.updateMaterialProcessed(element, input.value);
  }

  deliveredChanged(element: Material, input: HTMLInputElement) {
    this.db.updateMaterialDelivered(element, input.value);
  }

  scrollToTop() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
