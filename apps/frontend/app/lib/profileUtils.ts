import type { PublicProfile } from "@shared/profile";

export const getFullName = (profile: PublicProfile) => {
  return `${profile.first_name} ${profile.last_name}`;
};

export const getAxisValue = (profile: PublicProfile, axis: keyof PublicProfile) => {
  return profile[axis] as number;
};

export const AXIS_MAPPING = {
  "Establishment Alignment": "establishment_alignment",
  "Governance Style": "governance_style",
  "Market Policy": "market_policy",
  "Environmental Approach": "environmental_approach",
  "Social Policy": "social_policy",
  "Individualism": "individualism",
  "Innovation Approach": "innovation_approach",
  "International Outlook": "international_outlook",
};

export const AXIS_NAMES = Object.keys(AXIS_MAPPING);