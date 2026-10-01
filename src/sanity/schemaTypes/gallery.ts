// schemas/gallery.ts
import { Rule } from 'sanity';

export default {
  name: 'gallery',
  type: 'document',
  title: 'Media Gallery',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '3D Modelling', value: '3dModelling' },
          { title: 'Product Modeling', value: 'productModeling' },
          { title: 'Exterior', value: 'exterior' },
          { title: '3D Floor Plan', value: '3dFloorPlan' },
          { title: 'Interior', value: 'interior' },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
  ],
};
