import IntlMessageFormat from 'intl-messageformat';
import get from 'lodash.get';
import {ref} from './firebase';

const createCall = data =>
  fetch('https://lejonify.com/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());

const defaultOptions = {
  secretKey: process.env.LANGUAGE_APP_CREATE_KEY,
  live: false,
  defaultLanguage: 'en',
  language: 'en',
  translations: {},
  wrapperComponent: null,
  projectId: null,
};

export default class Core {
  listeners = [];

  createdStrings = [];

  gotInitialRemoteTranslations = false;

  constructor(options) {
    if (!options.projectId) {
      throw new TypeError('No projectId found');
    }
    this.options = Object.assign(defaultOptions, options);

    if (options.live && process.env.NODE_ENV === 'development') {
      if (Object.keys(this.options.translations).length > 0) {
        this.warn('Running live, not using any local translations...');
      }
      this.options.translations = {};
      const langref = ref.child(`/projects/${options.projectId}/translations/`);
      langref.on('value', snapshot => {
        const translations = snapshot.val();
        this.gotInitialRemoteTranslations = true;
        this.options.translations = translations;
        this.listeners.forEach(listener => listener(translations));
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  warn(...args) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(...args);
    }
  }

  createString(id, message, language) {
    if (process.env.NODE_ENV === 'development') {
      const identifier = `${language}:${id}`;
      if (this.createdStrings.includes(identifier)) {
        return;
      }
      this.createdStrings.push(identifier);
      createCall({
        project: this.options.projectId,
        language,
        messageId: id,
        message,
        secretKey: this.options.secretKey,
      }).then(() => {
        this.warn(`Created string "${id}" (language: "${language}")`);
      });
    }
  }

  translate(id, values = {}, defaultMessage = '') {
    const messageId = id.replace(/[^a-zA_Z0-9-_]/g, '-');
    const {options} = this;
    let message = get(options.translations, [options.language, messageId]);
    if (!message) {
      if (
        (options.live && this.gotInitialRemoteTranslations) ||
        !options.live
      ) {
        this.warn(
          `No string for "${messageId}" (language: "${
            options.language
          }") found`,
        );
        if (options.live && options.secretKey && defaultMessage) {
          this.createString(messageId, defaultMessage, options.language);
        }
      }
      message = defaultMessage || '';
    }
    try {
      const formatter = new IntlMessageFormat(message, options.language);
      return formatter.format(values);
    } catch (e) {
      this.warn('Formatting failed', e.message);
      return '';
    }
  }

  setLanguage(lang) {
    this.options.language = lang;
  }

  addListener(fn) {
    this.listeners.push(fn);
  }
}
