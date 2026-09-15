import { MascotSettings } from '@/types';

export const mockMascotSettings: MascotSettings = {
  activePose: 'idle',
  soundEnabled: true,
  dockPosition: 'bottom-right',
  currentDialogue: "Yo! Welcome to Ariesta's portfolio lab. Click me to trigger running telemetry!",
  dialogueList: [
    "Yo! Welcome to Ariesta's portfolio lab.",
    "Did you check out RunHub OS? Sub-30ms edge telemetry!",
    "Pacing today: 4'20\"/KM. Always moving forward.",
    "Need custom 3-color Riso posters? Ariesta's got you covered.",
    "Tip: Neo-brutalist buttons have physical click snaps. Try pressing them!",
  ],
  statusLabel: 'MASCOT TELEMETRY: V2.4 RUNNER',
  telemetryVersion: 'v2.4.D',
};
