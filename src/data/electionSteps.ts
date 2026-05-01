import {
  Calendar,
  FileText,
  Megaphone,
  CheckSquare,
  BarChart3,
  Trophy
} from 'lucide-react';

export type ElectionStep = {
  id: string;
  title: string;
  shortDescription: string;
  detailedExplanation: string;
  icon: any;
};

export const electionSteps: ElectionStep[] = [
  {
    id: 'announcement',
    title: 'Election Announcement',
    shortDescription: 'The Election Commission declares the election schedule.',
    detailedExplanation: 'The process begins when the Election Commission of India (ECI) announces the election dates. The Model Code of Conduct comes into effect immediately to ensure a level playing field.',
    icon: Calendar
  },
  {
    id: 'nomination',
    title: 'Nomination Filing',
    shortDescription: 'Candidates file papers to officially enter the race.',
    detailedExplanation: 'Interested candidates must submit their nomination papers along with an affidavit detailing their assets, liabilities, and criminal background (if any) to the Returning Officer.',
    icon: FileText
  },
  {
    id: 'campaigning',
    title: 'Campaigning',
    shortDescription: 'Candidates rally for votes across the constituency.',
    detailedExplanation: 'Political parties and candidates reach out to voters through rallies, door-to-door campaigns, and media. All campaigning must stop 48 hours before the polling day.',
    icon: Megaphone
  },
  {
    id: 'voting',
    title: 'Voting Process',
    shortDescription: 'Citizens cast their votes using EVMs & VVPATs.',
    detailedExplanation: 'Registered voters visit polling booths on the election day. They verify their identity and cast their vote using Electronic Voting Machines (EVM) alongside VVPATs for transparency.',
    icon: CheckSquare
  },
  {
    id: 'counting',
    title: 'Vote Counting',
    shortDescription: 'Votes are counted under strict supervision.',
    detailedExplanation: 'On a pre-announced date, EVMs are opened under heavy security. The votes are counted in the presence of candidates or their representatives to ensure fairness.',
    icon: BarChart3
  },
  {
    id: 'result',
    title: 'Result Declaration',
    shortDescription: 'The winner is officially declared.',
    detailedExplanation: 'The candidate with the highest number of valid votes in a constituency is declared elected by the Returning Officer. If a party wins the majority, they form the government.',
    icon: Trophy
  }
];
