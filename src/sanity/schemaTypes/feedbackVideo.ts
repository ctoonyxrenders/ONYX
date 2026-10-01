import { Rule } from "sanity";

export default {
    name: 'feedbackVideo',
    title: 'Feedback Video',
    type: 'document',
    fields: [
        {
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            validation: (Rule: Rule) => Rule.required().uri({ allowRelative: true }).error('Valid video URL is required'),
        },
    ],
}