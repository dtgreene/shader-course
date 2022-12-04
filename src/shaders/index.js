import { nanoid } from 'nanoid';

import shader1Setup from './shader-1';
import shader2Setup from './shader-2';
import shader3Setup from './shader-3';

export const shaders = [
  {
    name: 'Shader 1',
    id: nanoid(),
    setup: shader1Setup,
  },
  {
    name: 'Shader 2',
    id: nanoid(),
    setup: shader2Setup,
  },
  {
    name: 'Shader 3',
    id: nanoid(),
    setup: shader3Setup,
  },
];
