/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
import { PROJECT_ID, DATASET } from '@/constants/env'

const projectId = PROJECT_ID
const dataset = DATASET

export default defineCliConfig({ api: { projectId, dataset } })
