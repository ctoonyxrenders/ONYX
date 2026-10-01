// src/sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity'
import clientReview from './clientReview'
import teamMembers from './teamMembers'
import mapData from './mapData'
import gallery from './gallery'
import logos from './logos'
import feedbackVideo from './feedbackVideo'
import serviceMedia from './serviceMedia'

// REMOVED: visualizationPage -> replaced by serviceMedia
// REMOVED: projectData       -> the /portfolio page it fed is deleted

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [clientReview, teamMembers, mapData, gallery, logos, feedbackVideo, serviceMedia],
}