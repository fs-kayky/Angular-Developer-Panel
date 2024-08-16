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
import { ITreeNode } from '../../../interfaces/ITreeNode';

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

  data!: ITreeNode[] | [];

  actualNodes!: ITreeNode[];
  actualData: any = [];
  actualNode!: ITreeNode;
  actualNodeName!: string;

  visible: boolean = false;
  visibleInterns: boolean = false;
  editDialog: boolean = false;
  actualParentName!: string;
  actualParenteNode!: ITreeNode;

  imgValue: string = '';
  nameValue: string = '';
  titleValue: string = '';

  ediNametValue: string = '';
  editImgValue: string = '';
  editTitleValue: string = '';
  editRoleValue: string = '';

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
          'https://9b408944-f0c1-4bf9-b0e5-f1fafedd31fd-00-2jngfbqo2ruj7.picard.replit.dev/find-all-users'
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
    if (node.data && node.data.evaluationStatus) {
      node.styleClass = 'bg-green-200';
    } else {
      node.styleClass = 'bg-yellow-200';
    }
  }

  getSector(sectorName: string, gestorSectorName: string) {
    if (typeof this.data != 'undefined') {
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
  }

  showDialog() {
    this.visible = true;
  }

  handleEditClick() {
    this.visible = false;
    this.visibleInterns = false;
    this.editDialog = true;

    this.ediNametValue = '';
    this.editImgValue = '';
    this.editTitleValue = '';
    this.editRoleValue = '';
  }

  async editNode() {
    if (this.actualNode) {
      let name = this.actualNode.data.name;
      let image = this.actualNode.data.image;
      let title = this.actualNode.data.title;
      let role = this.actualNode.data.role;

      if (this.ediNametValue) {
        name = this.ediNametValue;
      }

      if (this.editImgValue) {
        image = this.editImgValue;
      }

      if (this.editTitleValue) {
        title = this.editTitleValue;
      }

      if (this.editRoleValue) {
        role = this.editRoleValue;
      }

      const editNodeObject = {
        role,
        name,
        image,
        title,
      };

      await new Promise((resolve, _) => {
        this.http
          .patch(
            `https://9b408944-f0c1-4bf9-b0e5-f1fafedd31fd-00-2jngfbqo2ruj7.picard.replit.dev/edit-user/${this.actualNode.id}`,
            editNodeObject
          )
          .subscribe({
            next: (data: any) => {
              this.visible = false;
              this.visibleInterns = false;
              this.editDialog = false
              this.data = data
              if(this.activeItem?.label && this.activeItem['subLabel']) {
                console.log(this.activeItem['subLabel'])
                this.getSector(this.activeItem.label, this.activeItem?.['subLabel']);
              }
              this.iterateEvaluationStatus(this.actualData);
            },
            error: (error: any) => {
              console.log(error);
            },
          });
      });

    }
  }

  async createChildNode() {

    if (this.imgValue && this.nameValue && this.titleValue) {
      if (this.actualParenteNode) {
        const newUser = {
          styleClass: '',
          expanded: true,
          type: 'person',
          data: {
            sector: this.activeItem?.label,
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
        };

        this.actualParenteNode.children?.push(newUser);
        this.visible = false;
        this.actualParentName = '';
        this.imgValue = '';
        this.nameValue = '';
        this.titleValue = '';
        this.iterateEvaluationStatus(this.actualData);

        await new Promise((resolve, _) => {
          this.http
            .post(
              'https://9b408944-f0c1-4bf9-b0e5-f1fafedd31fd-00-2jngfbqo2ruj7.picard.replit.dev/create-user',
              {
                id: this.actualParenteNode.id,
                data: newUser,
              }
            )
            .subscribe({
              next: (data: any) => {
                this.data = data;
                this.visible = false;
              },
              error: (error: any) => {
                console.log('DEU BOMBA CRIANDO USUARIO');
              },
            });
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos',
      });
    }
  }

  async deleteNode() {
    if (this.actualParenteNode) {
      await new Promise((resolve, _) => {
        this.http
          .delete(
            `https://9b408944-f0c1-4bf9-b0e5-f1fafedd31fd-00-2jngfbqo2ruj7.picard.replit.dev/delete-user/${this.actualParenteNode.id}`
          )
          .subscribe({
            next: (data: any) => {
              console.log('DEU BOM DELETANDO USUARIO');
              this.visible = false;
              this.visibleInterns = false;
              this.editDialog = false
              this.data = data
            },
            error: (error: any) => {
              console.log('DEU BOMBA DELETANDO USUARIO');
            },
          });
      });
    }
  }

  handleCollaboratorClick(node: TreeNode): void {
    if (node.data.role === 'estagiario') {
      this.actualNode = node;
      this.actualNodeName = node.data.name;
      this.visibleInterns = true;
    } else {
      this.actualNode = node;
      this.actualNodeName = node.data.name;
      this.actualParenteNode = node;
      this.actualParentName = node.data.name;
      this.showDialog();
    }
  }

  private iterateEvaluationStatus(nodes: TreeNode[]): void {
    if (this.actualData != 'undefined') {
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
