// Location configuration for dropdown
export const LOCATIONS = [
  'Gurgaon',
  'Noida',
  'Faridabad',
  'Greater Noida',
  'Manesar',
  'Karnal',
  'Panipat',
  'Rohtak',
  'Bahadurgarh',
  'Sonepat',
  'Delhi',
  'Gurugram',
  'Other'
];

export const getLocationLabel = (location) => {
  return LOCATIONS.includes(location) ? location : 'Select Location';
};
