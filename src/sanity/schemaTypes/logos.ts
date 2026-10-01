import { Rule } from 'sanity';

export default {
    name: 'logos',
    type: 'document',
    title: 'Logos',
    fields: [
        {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'image', options: { hotspot: true } }],
        validation: (Rule: Rule) => Rule.required().min(1),
        },
    ],
    };