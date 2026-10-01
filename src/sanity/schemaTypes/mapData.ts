import CountryAutoCodeInput from '../../components/inputs/CountryAutoCodeInput'
import { countryList } from '../../components/inputs/countryCodeMap'
import { Rule } from 'sanity'

export default {
  name: 'mapData',
  type: 'document',
  title: 'Map Data',
  fields: [
    {
      name: 'countryStat',
      type: 'array',
      title: 'Country Stats',
      of: [
        {
          type: 'object',
          name: 'countryItem',
          title: 'Country Item',
          fields: [
            {
              name: 'countryName',
              title: 'Country Name',
              type: 'string',
              options: {
                list: countryList,
              },
              validation: (Rule: Rule) => Rule.required().error('Country name is required'),
            },
            {
              name: 'value',
              title: 'Sales Value',
              type: 'number',
              validation: (Rule: Rule) => Rule.required().min(0),
            },
            {
              name: 'countryCode',
              title: 'Country Code',
              type: 'string',
              components: {
                input: CountryAutoCodeInput,
              },
              
            },
          ],
        },
      ],
    },
  ],
}
