import get from 'lodash/get'
import { Lang, LangTranslator } from 'vuetify/types/services/lang'

const en = {
  name: {
    label: 'Name',
    description: 'The name of the person'
  },
  vegetarian: {
    label: 'Vegetarian',
    description: 'Wether the person is a vegetarian'
  },
  birth: {
    label: 'Birth Date',
    description: ''
  },
  nationality: {
    label: 'Nationality',
    description: ''
  },
  'personal-data': {
    age: {
      label: 'Age'
    },
    driving: {
      label: 'Driving Skill',
      description: 'Indicating experience level'
    }
  },
  height: {
    label: 'Height'
  },
  occupation: {
    label: 'Occupation',
    description: ''
  },
  'postal-code': {
    label: 'Postal Code'
  },
  error: {
    required: 'field is required'
  }
}

const de = {
  name: {
    label: 'Name',
    description: 'Der Name der Person'
  },
  vegetarian: {
    label: 'Vegetarier',
    description: 'Isst die Person vegetarisch?'
  },
  birth: {
    label: 'Geburtsdatum',
    description: ''
  },
  nationality: {
    label: 'Nationalität',
    description: '',
    Other: 'Andere'
  },
  'personal-data': {
    age: {
      label: 'Alter'
    },
    driving: {
      label: 'Fahrkenntnisse',
      description: 'Fahrerfahrung der Person'
    }
  },
  height: {
    label: 'Größe'
  },
  occupation: {
    label: 'Beruf',
    description: ''
  },
  'postal-code': {
    label: 'Postleitzahl'
  },
  error: {
    required: 'Pflichtfeld'
  },
  'Additional Information': 'Zusätzliche Informationen'
}

export type SupportedLocales = 'en' | 'de'

export const createTranslator =
  (locale: SupportedLocales, lang: Lang) =>
    (key: string, defaultMessage: string | undefined): string | undefined => {
      if (!key) {
        console.warn('KEY WAS UNDEFINED')
        return ''
      }
      console.log('KEY:', key)
      const trans: string = lang.t(key)
      console.log('TRANS:', trans)
      return trans || defaultMessage
    }
