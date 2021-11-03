import get from 'lodash/get'

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
  form: {
    grants: {
      depositor: {
        depositor_name: {
          error: {
            pattern: 'Please enter a name that matches a US telephone number'
          }
        },
        email_address: {
          error: {
            customDONOTUSE: 'An email address is required to complete this form, you know',
            format: 'This is not an email address'
          }
        },
        error: {
          required: 'You really must fill in this field in the Depositor section'
        }
      }
    }
  },
  error: {
    required: 'This globally scoped message tells you this field is required'
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
  form: {
    grants: {
      depositor: {
        depositor_name: {
          error: {
            required: 'Hier ist Feldasbchribesaggen uber Depositor Name'
          }
        },
        email_address: {
          error: {
            custom1: 'Schade falschgemmacksammen',
            format: 'Hier ist keine Email',
            required: 'Bitte ihren Email hier schriben'
          }
        }
      }
    }
  },
  error: {
    required: 'Pflichtfeld'
  },
  'Additional Information': 'Zusätzliche Informationen'
}

export type SupportedLocales = 'en' | 'de'

export const createTranslator =
  (locale: SupportedLocales) =>
    (key: string, defaultMessage: string | undefined): string | undefined => {
      console.log('KEY IN TRANSLATOR:', key)
      console.log('DEFAULT MESSAGE IN TRANSLATOR:', defaultMessage)
      return get(locale === 'en' ? en : de, key) ?? defaultMessage
    }
