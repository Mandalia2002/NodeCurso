const getAgePlugin = require('get-age');

export const getAge = (birthdate: any) => {
          if (!birthdate) return getAgePlugin('birthdate is required');
          return getAgePlugin(birthdate);
}