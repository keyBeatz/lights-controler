/*
 * AppMessages Messages
 *
 * This contains all the text for the AppMessages component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  /**
   * Login
   */
  loggedInSuccessfully: {
    id: 'app.containers.AppMessages.loggedInSuccessfully',
    defaultMessage: 'Byli jste úspěšně přihlášení!',
  },
  loginError: {
    id: 'app.containers.AppMessages.loginError',
    defaultMessage: 'Nesprávné přihlašovací údaje :(',
  },
  /**
   * Lights
   */
  loadingServiceCharacteristicsError: {
    id: 'app.containers.AppMessages.loadingServiceCharacteristicsError',
    defaultMessage: 'Chyba při načítaní charakterstiky služby {serviceName}',
  },
  /**
   * Characteristics
   */
  characteristicsSetSuccessfully: {
    id: 'app.containers.AppMessages.characteristicsSetSuccessfully',
    defaultMessage: 'Úspěšně nastaveno',
  },
  characteristicsSetError: {
    id: 'app.containers.AppMessages.characteristicsSetError',
    defaultMessage: 'Chyba, zkuste to prosím znovu',
  },
  /**
   * Services
   */
  servicesFetchError: {
    id: 'app.containers.AppMessages.servicesFetchError',
    defaultMessage: 'Načítání dat selhalo',
  },
});
