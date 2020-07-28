export interface TenorPerson {
  identifikasjonsnummer: Identifikasjonsnummer[];
  status: Status[];
  kjoenn: Kjoenn[];
  foedsel: Foedsel[];
  familierelasjon: Familierelasjon[];
  sivilstand: Sivilstand[];
  navn: Navn[];
  bostedsadresse: Bostedsadresse[];
  preferertKontaktadresse: PreferertKontaktadresse[];
  postadresse: Postadresse[];
  statsborgerskap: Statsborgerskap[];
}

export interface Identifikasjonsnummer {
  ajourholdstidspunkt: Date;
  erGjeldende: boolean;
  kilde: string;
  status: string;
  foedselsEllerDNummer: string;
  identifikatortype: string;
}

export interface Status {
  ajourholdstidspunkt: Date;
  erGjeldende: boolean;
  kilde: string;
  gyldighetstidspunkt: Date;
  status: string;
}

export interface Kjoenn {
  erGjeldende: boolean;
  kilde: string;
  kjoenn: string;
}

export interface Foedsel {
  erGjeldende: boolean;
  kilde: string;
  foedselsdato: string;
  foedselsaar: string;
  foedekommuneINorge: string;
  foedeland: string;
}

export interface Familierelasjon {
  ajourholdstidspunkt: Date;
  erGjeldende: boolean;
  kilde: string;
  gyldighetstidspunkt: Date;
  relatertPerson: string;
  relatertPersonsRolle: string;
  minRolleForPerson: string;
}

export interface Sivilstand {
  erGjeldende: boolean;
  kilde: string;
  aarsak: string;
  gyldighetstidspunkt: Date;
  sivilstand: string;
  sivilstandsdato: string;
}

export interface Navn {
  erGjeldende: boolean;
  kilde: string;
  aarsak: string;
  gyldighetstidspunkt: Date;
  fornavn: string;
  etternavn: string;
  forkortetNavn: string;
}

export interface Poststed {
  poststedsnavn: string;
  postnummer: string;
}

export interface Vegadresse {
  kommunenummer: string;
  bruksenhetsnummer: string;
  bruksenhetstype: string;
  adressenavn: string;
  adressekode: string;
  poststed: Poststed;
  coAdressenavn: string;
}

export interface UkjentBosted {
  bostedskommune: string;
}

export interface Bostedsadresse {
  ajourholdstidspunkt: Date;
  erGjeldende: boolean;
  kilde: string;
  aarsak: string;
  gyldighetstidspunkt: Date;
  vegadresse: Vegadresse;
  adresseIdentifikatorFraMatrikkelen: string;
  adressegradering: string;
  grunnkrets: number;
  stemmekrets: number;
  skolekrets: number;
  kirkekrets: number;
  ukjentBosted: UkjentBosted;
  flyttedato: string;
}

export interface KontaktadresseIFrittFormat {
  adresselinje: string[];
}

export interface PreferertKontaktadresse {
  erGjeldende: boolean;
  kilde: string;
  valg: string;
  adressegradering: string;
  kontaktadresseIFrittFormat: KontaktadresseIFrittFormat;
}

export interface PostadresseIFrittFormat {
  adresselinje: string[];
}

export interface Postadresse {
  erGjeldende: boolean;
  kilde: string;
  gyldighetstidspunkt: Date;
  adressegradering: string;
  postadresseIFrittFormat: PostadresseIFrittFormat;
  ajourholdstidspunkt?: Date;
}

export interface Statsborgerskap {
  erGjeldende: boolean;
  kilde: string;
  gyldighetstidspunkt: Date;
  statsborgerskap: string;
  ervervsdato: string;
}
