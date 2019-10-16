import {visiterAmsterdam} from '../constant/categories';

export default (date, category) => {
  const timestamp = new Date(date);
  let dateString;
  if (['visiter-amsterdam', 'vivre-aux-pays-bas', visiterAmsterdam].includes(category)) {
    let period = (new Date() - timestamp) / 1000 / 60 / 60 / 24;
    let unit;
    if (period < 7) {
      period = Math.floor(period);
      unit = period > 1 ? 'jours' : 'jour';
    } else if (period < 35) {
      period = Math.floor(period / 7);
      unit = period > 1 ? 'semaines' : 'semaine';
    } else if (period < 371) {
      period = Math.floor(period / 30.5);
      unit = 'mois';
    } else {
      period = Math.floor(period / 365);
      unit = period > 1 ? 'ans' : 'an';
    }
    dateString = `Mise à jour il y ${period} ${unit}`;
  } else {
    const day = timestamp.getDate();
    const year = timestamp.getFullYear();
    let month;
    switch (timestamp.getMonth()) {
      case 0:
        month = 'janvier';
        break;
      case 1:
        month = 'février';
        break;
      case 2:
        month = 'mars';
        break;
      case 3:
        month = 'avril';
        break;
      case 4:
        month = 'mai';
        break;
      case 5:
        month = 'juin';
        break;
      case 6:
        month = 'juillet';
        break;
      case 7:
        month = 'août';
        break;
      case 8:
        month = 'septembre';
        break;
      case 9:
        month = 'octobre';
        break;
      case 10:
        month = 'novembre';
        break;
      default:
        month = 'décembre';
    }
    dateString = `Publié le ${day} ${month} ${year}`;
  }
  return dateString;
};
