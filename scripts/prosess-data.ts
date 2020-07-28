import { readData, writeTenorSync, cleanProsessed } from './tenor-utils/utils';
import { personsData } from './tenor-utils/persons-vm';

const program = async () => {
  await cleanProsessed();
  const rawData = await readData('tenor');
  const personData = rawData.map(personsData);
  writeTenorSync('person-vm-list.json', personData);

  console.log(personData.length);
};

program();
