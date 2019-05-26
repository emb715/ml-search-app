
const cleanHtmlString = string => (string);

const formatNumber = number => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(number);

export default cleanHtmlString;
