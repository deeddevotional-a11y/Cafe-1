/**
 * Ready-made palette + type presets.
 * Drop one into `cafe.theme` in cafe.config.js:
 *
 *   import { presets } from './themes.js';
 *   theme: { ...presets.pastelBakery, grain: false, radius: 'round' }
 *
 * Each preset was contrast-checked: body text ≥ 7:1, muted text ≥ 4.5:1
 * against its own background.
 */

export const presets = {
  /** Moody specialty espresso bar (the demo). */
  darkRoast: {
    colors: {
      bg: '#0B0D0C',
      surface: '#131715',
      surface2: '#1B211E',
      line: 'rgba(244, 241, 233, 0.12)',
      text: '#F4F1E9',
      muted: '#A9B0A8',
      brand: '#E8A13A',
      brandInk: '#160F05',
      brandSoft: 'rgba(232, 161, 58, 0.14)',
      accent: '#3E7A66',
    },
    fonts: {
      display: "'Fraunces', ui-serif, Georgia, serif",
      body: "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
  },

  /** Soft, light bakery-cafe: paper, blush, cocoa. */
  pastelBakery: {
    colors: {
      bg: '#FBF7F2',
      surface: '#FFFFFF',
      surface2: '#F3EBE3',
      line: 'rgba(58, 42, 34, 0.14)',
      text: '#2C211C',
      muted: '#6B5A50',
      brand: '#C25A6B',
      brandInk: '#FFFFFF',
      brandSoft: 'rgba(194, 90, 107, 0.12)',
      accent: '#7C9A7A',
    },
    fonts: {
      display: "'Fraunces', ui-serif, Georgia, serif",
      body: "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
  },

  /** Bold modern minimalist: ink on paper with one loud accent. */
  boldMinimal: {
    colors: {
      bg: '#F2F2EF',
      surface: '#FFFFFF',
      surface2: '#E7E7E2',
      line: 'rgba(17, 17, 17, 0.16)',
      text: '#111111',
      muted: '#565650',
      brand: '#1F49E0',
      brandInk: '#FFFFFF',
      brandSoft: 'rgba(31, 73, 224, 0.10)',
      accent: '#E2483D',
    },
    fonts: {
      display: "'Inter', ui-sans-serif, system-ui, sans-serif",
      body: "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
  },

  /** Green-forward garden cafe / plant-filled brunch room. */
  gardenGreen: {
    colors: {
      bg: '#0F1A14',
      surface: '#152219',
      surface2: '#1D2C22',
      line: 'rgba(233, 244, 235, 0.13)',
      text: '#EDF3ED',
      muted: '#9EB2A3',
      brand: '#9FD356',
      brandInk: '#0F1A14',
      brandSoft: 'rgba(159, 211, 86, 0.14)',
      accent: '#E4A0A0',
    },
    fonts: {
      display: "'Fraunces', ui-serif, Georgia, serif",
      body: "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
  },
};

export default presets;
