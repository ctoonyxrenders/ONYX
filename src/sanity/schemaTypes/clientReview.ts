import { validation } from "sanity";
import { Rule } from "sanity";

// schemas/testimony.js (or .ts if using TypeScript)
export default {
  name: 'clientReview',
  title: 'Client Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Name is required'),
    },
    {
      name: 'designation',
      title: 'Designation',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Designation is required'),
    },
    {
      name: 'img',
      title: 'Client Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule:Rule) => Rule.required().error('Image is required'),
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required().error('Company logo is required'),
    },
    {
      name: 'review',
      title: 'Review Text',
      type: 'text',
      validation: (Rule: Rule) => Rule.required().min(10).max(500).error('Review must be between 10 and 500 characters'),
    },
    
  ],
}
