import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Model, models, types } from "@/app/playground/data/models"
export const gpt4ModelAtom = atomWithStorage<Model>(
  'gpt4ModelAtom',
    models.find((model) => model.name === "gpt-4")!,
);

export const firstModelAtom = atomWithStorage<Model>(
  'firstModelAtom',
    models[0]!,
);

export const secondModelAtom = atomWithStorage<Model>(
  'secondModelAtom',
    models[1]!,
);
export const compareModelAtom = atomWithStorage<boolean>(
  'compareModelAtom',
  false,
);
export const promptAtom = atomWithStorage<string>(
  'promptAtom',
  '',
);
export const promptAtomMeta = atomWithStorage<string>(
  'promptAtomMeta',
  '',
);
export const instructionsAtom = atomWithStorage<string>(
  'instructionsAtom',
  '',
);
export const modelOneResAtom = atomWithStorage<string>(
  'modelOneResAtom',
  '',
);
export const modelTwoResAtom = atomWithStorage<string>(
  'modelTwoResAtom',
  '',
);

export const temperatureAtom = atomWithStorage<number>(
  'temperatureAtom',
  0,
);

export const top_pAtom = atomWithStorage<number>(
  'top_pAtom',
  0.9,
);

export const max_tokensAtom = atom<number>(
  4096
);


export const promptResAtom = atomWithStorage<string[]>(
  'promptResAtom',
  [],
);


