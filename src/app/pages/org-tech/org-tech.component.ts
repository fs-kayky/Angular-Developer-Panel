import { Component, inject, OnInit } from '@angular/core';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { MessageService, TreeNode } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

const dianaData: TreeNode[] = [];

@Component({
  selector: 'app-org-tech',
  standalone: true,
  imports: [
    TabMenuModule,
    OrganizationChartModule,
    TabViewModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './org-tech.component.html',
  styleUrl: './org-tech.component.scss',
})
export class OrgTechComponent implements OnInit {
  private http = inject(HttpClient);

  data!: TreeNode[] | [];

  actualNodes!: TreeNode[];
  actualData: any = [];

  visible: boolean = false;
  actualParentName!: string;
  actualParenteNode!: TreeNode;

  imgValue: string = '';
  nameValue: string = '';
  titleValue: string = '';

  constructor(private messageService: MessageService) {}

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  onActiveItemChange(event: any) {
    this.getSector(event?.label, event?.subLabel);
    this.iterateEvaluationStatus(this.actualData);
    this.activeItem = event;
  }

  async ngOnInit() {
    this.items = [
      { label: 'DESENVOLVIMENTO', icon: 'pi pi-home', subLabel: 'TECNOLOGIA' },
      { label: 'BI', icon: 'pi pi-chart-line', subLabel: 'TECNOLOGIA' },
      { label: 'INFRA', icon: 'pi pi-list', subLabel: 'TECNOLOGIA' },
      { label: 'DEPARTAMENTO PESSOAL', icon: 'pi pi-list', subLabel: 'RH' },
      { label: 'GENTE&GESTAO', icon: 'pi pi-list', subLabel: 'RH' },
    ];

    this.activeItem = this.items[0];

    await new Promise((resolve, _) => {
      this.http
        .get(
          'https://9b408944-f0c1-4bf9-b0e5-f1fafedd31fd-00-2jngfbqo2ruj7.picard.replit.dev'
        )
        .subscribe({
          next: (data: any) => {
            this.data = data;
            this.getSector('DESENVOLVIMENTO', 'TECNOLOGIA');
            this.iterateEvaluationStatus(this.actualData);
          },
          error: (error: any) => {
            console.log('DEU BOMBA');
            this.actualData = [];
          },
        });
    });
  }

  private applyStatus(node: TreeNode): void {
    if (node.data.evaluationStatus) {
      node.styleClass = 'bg-green-200';
    } else {
      node.styleClass = 'bg-yellow-200';
    }
  }

  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  getSector(sectorName: string, gestorSectorName: string) {
    this.data.filter((node: any) => {
      if (node.data.sector === gestorSectorName) {
        this.actualData = [];
        this.actualData.push({ ...node });
        const teste: any = node.children.filter((child: any) => {
          if (child.data.sector === sectorName) {
            return child;
          }
        });
        if (teste) {
          this.actualData[0].children = [];
          this.actualData[0].children.push(...teste);
        }
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  createChildNode() {
    if (this.actualParenteNode) {
      this.actualParenteNode.children?.push({
        styleClass: '',
        expanded: true,
        type: 'person',
        data: {
          role:
            this.actualParenteNode.data.role === 'analista'
              ? 'estagiario'
              : 'analista',
          image: `${this.imgValue}`,
          name: `${this.nameValue}`,
          title: `${this.titleValue}`,
          evaluationStatus: false,
        },
        children: [],
      });
      this.iterateEvaluationStatus(this.actualData);
      this.visible = false;
      this.actualParentName = '';
      this.imgValue = '';
      this.nameValue = '';
      this.titleValue = '';
    }
  }

  handleCollaboratorClick(node: TreeNode): void {
    if (node.data.role === 'estagiario') {
      this.showError('Estagiário não podem ter subordinados!');
    } else {
      this.actualParenteNode = node;
      this.actualParentName = node.data.name;
      this.showDialog();
    }
  }

  private iterateEvaluationStatus(nodes: TreeNode[]): void {
    console.log(nodes);

    if (this.actualData) {
      this.actualData.map((node: any) => {
        this.applyStatus(node);
        if (node.children.length > 0) {
          node.children.map((child: any) => {
            this.applyStatus(child);
            if (child.children.length > 0) {
              child.children.map((child2: any) => {
                this.applyStatus(child2);
              });
            }
          });
        }
      });
    }
  }
}
