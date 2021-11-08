import get from 'lodash/get'
import { en, de } from '@/locales/index'

export type SupportedLocales = 'en' | 'de'

export const createTranslator =
  (locale: SupportedLocales) =>
    (key: string, defaultMessage: string | undefined): string | undefined => {
      console.log('KEY IN TRANSLATOR:', key)
      console.log('DEFAULT MESSAGE IN TRANSLATOR:', defaultMessage)
      const translation = get(locale === 'en' ? en : de, key) ?? defaultMessage
      return translation || ''
    }
