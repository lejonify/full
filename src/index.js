import Core from './core';

export {default as Provider} from './Provider';
export {default as Message} from './Message';
export {Consumer} from './context';
export {default as withLanguage} from './withLanguage';

export const init = _options => {
  const core = new Core(_options);
  return core;
};
