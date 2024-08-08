import { Component } from '@angular/core';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-org-tech',
  standalone: true,
  imports: [OrganizationChartModule],
  templateUrl: './org-tech.component.html',
  styleUrl: './org-tech.component.scss',
})
export class OrgTechComponent {
  selectedNodes!: TreeNode[];

  data: TreeNode[] = [
    {
      expanded: true,
      type: 'person',
      data: {
        image:
          'https://media.licdn.com/dms/image/D4D35AQEmrJ3oNMu-Iw/profile-framedphoto-shrink_800_800/0/1721755984611?e=1723572000&v=beta&t=y2xsCm5bAMF8ICDbYSIjFgVQntiY9Cx6K_Gcra1hIJ8',
        name: 'Felipe Barbosa',
        title: 'CEO',
      },
      children: [
        {
          label: 'Tecnologia',
          children: [
            {
              expanded: true,
              type: 'person',
              data: {
                image:
                  'https://media.licdn.com/dms/image/C4D03AQFn2UOPFTbLmQ/profile-displayphoto-shrink_800_800/0/1618924385570?e=1728518400&v=beta&t=B9IcPxr2W8hMdMplpZoY_PqFknd7sU9CeQoj5b7GR2s',
                name: 'Diana Serrano',
                title: 'Gerente de Tecnologia',
              },
              children: [
                {
                  label: 'B.I',
                  children: [
                    {
                      expanded: true,
                      type: 'person',
                      data: {
                        image:
                          'https://media.licdn.com/dms/image/C4E03AQHU4HEjY6H5lQ/profile-displayphoto-shrink_800_800/0/1655321771989?e=1728518400&v=beta&t=RnQ-55IPK8ZXUDaguLV_UpwDpeOsqYMkjlHh-oqvGxQ',
                        name: 'Edward Booth',
                        title: 'Analista de B.I',

                      },
                      children: [
                        {
                          expanded: true,
                          type: 'person',
                          data: {
                            image:
                              'https://media.licdn.com/dms/image/C4D03AQFt65miAp6lEA/profile-displayphoto-shrink_800_800/0/1598402284276?e=1728518400&v=beta&t=BVTXh-9lhBO5exLrsZyZWGlpKWlmxW0MDDIatGLm1oM',
                            name: 'Eduardo Novelino',
                            title: 'Estaigiário de B.I',
                          }
                        },
                        {
                          expanded: true,
                          type: 'person',
                          data: {
                            image:
                              'https://media.licdn.com/dms/image/D4E03AQEtljWHP9AnOQ/profile-displayphoto-shrink_800_800/0/1721253986800?e=1728518400&v=beta&t=bDxsYq8_jKqYZAa3WFFYc2pjcxPx23jUfMx52OmaBKY',
                            name: 'Mateus Restier',
                            title: 'Estaigiário de B.I',
                          }
                        }
                      ],
                    },
                    {
                      expanded: true,
                      type: 'person',
                      data: {
                        image:
                          'https://media.licdn.com/dms/image/C4E03AQER65m1u2IWyw/profile-displayphoto-shrink_800_800/0/1662004173100?e=1728518400&v=beta&t=s8uA65KFx8m2aDCb7tKuMA7_G45x5C3HMv338uGo_4s',
                        name: 'Gabriel Costa',
                        title: 'Analista de B.I',
                      },
                    },
                  ],
                },
                {
                  label: 'Desenvolvimento',
                  children: [
                    {
                      expanded: true,
                      type: 'person',
                      data: {
                          image: 'https://media.licdn.com/dms/image/D4D03AQGJ0U0OC-AqqA/profile-displayphoto-shrink_800_800/0/1678276189813?e=1728518400&v=beta&t=oqHsYq0M7i1W8MZ2LNPoNuGJo53ydfvlG6A3Hy9LVOU',
                          name: 'Edvan de Souza',
                          title: 'Analista de desenvolvimento'
                      },
                      children: [

                      ]
                    },
                    {
                      expanded: true,
                      type: 'person',
                      data: {
                          image: 'https://media.licdn.com/dms/image/D4D03AQF-wqFZZSAQsA/profile-displayphoto-shrink_800_800/0/1715373805720?e=1728518400&v=beta&t=rQVLirSp5G231AhMRgqwjyS5uKWhS2MuzRZJ0miVU90',
                          name: 'Patrick Anjos',
                          title: 'Analista de desenvolvimento'
                      },
                      children: [
                        {
                          expanded: true,
                          type: 'person',
                          data: {
                            image: 'https://media.licdn.com/dms/image/D4E03AQGxdUQ2FVd4DQ/profile-displayphoto-shrink_800_800/0/1721179715784?e=1728518400&v=beta&t=PGT6IKuFEzLeXvDcVAwJxpx1XAa-8wXzXbr_EpNTbyc',
                            name: 'Kayky Rodrigues',
                            title: 'Estagiário Web'
                          }
                        },
                        {
                          expanded: true,
                          type: 'person',
                          data: {
                            image: 'https://media.licdn.com/dms/image/D4D03AQHgjBbOGLsCig/profile-displayphoto-shrink_800_800/0/1678555371145?e=1728518400&v=beta&t=MOFCdzoKfdd20nHENZbPcHdKcaDEhQmVq09ZDjxJHv8',
                            name: 'Witor Oliveira',
                            title: 'Estagiário Web'
                          }
                        }
                      ]
                  },
                  ],
                },
                {
                  label: 'Infraestrutura',
                  children: [],
                }
              ],
            }
          ]
        },
      ],
    },
  ];
}
