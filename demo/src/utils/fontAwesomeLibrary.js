import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

export const registerIcons = () => {
  // Add font awesome icons to the library in order to import just used icons
  library.add(fab);
};
