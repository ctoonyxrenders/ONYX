// schemas/teamMember.js
import { Rule } from 'sanity';
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'number',
      validation: (Rule : Rule) => Rule.required().min(1).integer(),
    },
    {
      name: 'name',
      title: 'Full Name | Title',
      type: 'string',
      validation: (Rule : Rule) => Rule.required(),
    },
    {
      name: 'designation',
      title: 'Designation',
      type: 'string',
      validation: (Rule : Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule : Rule) => Rule.required().error('Profile image is required'),
    },
    {
      name: 'alt',
      title: 'Image Alt Text',
      type: 'string',
      validation: (Rule : Rule) => Rule.required(),
    },
  ],
}
