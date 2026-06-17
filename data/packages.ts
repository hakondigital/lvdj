export type PackageTier = "bronze" | "silver" | "gold";

export interface PackageInfo {
  id: PackageTier;
  name: string;
  tagline: string;
  price: number;
  rateLabel: string;
  blurb: string;
  inclusions: string[];
  bestFor: string;
}

export const PACKAGES: PackageInfo[] = [
  {
    id: "bronze",
    name: "Bronze",
    tagline: "DJ Only.",
    price: 350,
    rateLabel: "$350 / night",
    blurb:
      "Pure DJ. No fluff. Just bangers, mixed properly, on your speakers. Bring your own lights — I'll bring the energy.",
    inclusions: [
      "Full DJ set (4 hours)",
      "Pioneer controller + headphones",
      "Pre-event song requests welcome",
      "Clean / explicit mix on request",
      "Travel within Sydney metro",
    ],
    bestFor: "House parties, intimate gatherings, small functions.",
  },
  {
    id: "silver",
    name: "Silver",
    tagline: "DJ + Lights.",
    price: 450,
    rateLabel: "$450 / night",
    blurb:
      "Simple. Professional. Reliable. The DJ rig you'd want at your own party — lights synced to the drop.",
    inclusions: [
      "Everything in Bronze",
      "Moving-head party lights",
      "Beat-synced light show",
      "Crowd-read MC moments (no cringe)",
      "Setup + pack-down handled",
    ],
    bestFor: "16ths, 17ths, birthdays, engagements, mid-size venues.",
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "The Ultimate Experience.",
    price: 500,
    rateLabel: "$500 / night",
    blurb:
      "DJ + lights + dual smoke + lasers. The whole arsenal. Built for a room that needs to feel like a club.",
    inclusions: [
      "Everything in Silver",
      "Dual low-fog smoke machines",
      "Laser show (multi-pattern)",
      "Upgraded sound for bigger rooms",
      "Hype-built setlist for your crowd",
    ],
    bestFor: "18ths, 21sts, formals, club nights, afters that need to go off.",
  },
];

export const PACKAGE_BY_ID: Record<PackageTier, PackageInfo> = Object.fromEntries(
  PACKAGES.map((pkg) => [pkg.id, pkg])
) as Record<PackageTier, PackageInfo>;
