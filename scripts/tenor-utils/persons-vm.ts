import {
  Foedsel,
  Kjoenn,
  Navn,
  Identifikasjonsnummer,
  TenorPerson,
} from './tenor-person.model';

type ErGjeldende = { erGjeldende: boolean };

export interface PersonVm {
  navn: Navn;
  foedsel: Foedsel;
  kjoenn: Kjoenn;
  id: string;
}

const pickGjeldende = <T extends ErGjeldende>(list: T[]): T => {
  let returnValue = null;
  if (!list) {
    return null;
  }

  list.forEach(item => {
    if (item.erGjeldende) {
      returnValue = item;
    }
  });

  if (!returnValue) {
    console.log('Missing erGjeldende: ', list);
    process.exit(1);
  }

  return returnValue;
};

export const personsData = (raw: TenorPerson): PersonVm => {
  const navn = pickGjeldende(raw.navn);
  const foedsel = pickGjeldende(raw.foedsel);
  const kjoenn = pickGjeldende(raw.kjoenn);
  const idGjeldende = pickGjeldende(
    raw.identifikasjonsnummer,
  ) as Identifikasjonsnummer;
  const id = idGjeldende.foedselsEllerDNummer;

  return {
    navn,
    foedsel,
    kjoenn,
    id,
  };
};
