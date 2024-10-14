import { NextResponse } from 'next/server';

const kpis = [
  {
    id: 1,
    name: 'Assets Viewed',
    description: 'Total assets viewed within a specific time frame',
    businesQuestions: [
      {
        id: 1,
        question: 'How many assets are being viewed?',
        answer: 'There are 100 assets being viewed',
      },
      {
        id: 2,
        question: 'What are the most viewed assets?',
        answer: 'The most viewed assets are: asset1, asset2, asset3',
      },
      {
        id: 3,
        question: 'How often are users interacting with assets?',
        answer: 'Users are interacting with assets 100 times per day',
      },
      {
        id: 4,
        question: 'Is there a an upward or downward trend in asset views?',
        answer: 'There is an upward trend in asset views',
      },
    ],
    metricIds: ['TOTAL_VIEWS_PER_ASSET', 'TOTAL_VIEWS', 'UNIQUE_VIEWS_ASSETS'],
    calculations: [
      { name: 'Total Views', description: 'Total views of all assets', formula: 'SUM(views)' },
      {
        name: 'Unique Views',
        description: 'Total unique views of all assets',
        formula: 'COUNT(DISTINCT views)',
      },
      {
        name: 'Total Views Per Asset',
        description: 'Total views of each asset',
        formula: 'SUM(views) GROUP BY asset_id',
      },
    ],
    affiliateApplicability: ['stakeholders', 'admin'],
    visuals: ['line', 'pie', 'doughnut'],
  },
  {
    id: 2,
    name: 'Assets Favorited',
    description: 'Total assets favorited within a specific time frame',
    businesQuestions: [
      {
        id: 5,
        question: 'Which assets are most valued by users?',
        answer: 'The most valued assets are: asset1, asset2, asset3',
      },
      {
        id: 6,
        question: 'Is there a coorrelation between asset views and favorites?',
        answer: 'There is a coorrelation between asset views and favorites',
      },
      {
        id: 7,
        question: 'Is there a coorrelation between favourties and asset usage in reports?',
        answer: 'There is a coorrelation between favourties and asset usage in reports',
      },
      {
        id: 8,
        question: 'Is there a an upward or downward trend in asset favorites?',
        answer: 'There is an upward trend in asset favorites',
      },
    ],
    metricIds: ['TOTAL_FAVORITES_PER_ASSET', 'TOTAL_FAVORITES'],
    calculations: [
      {
        name: 'Total Favorites Per Asset',
        description: 'Total favorites of each asset',
        formula: 'SUM(favorites) GROUP BY asset_id',
      },
      {
        name: 'Total Favorites',
        description: 'Total favorites of all assets',
        formula: 'SUM(favorites)',
      },
    ],
    affiliateApplicability: ['stakeholders', 'admin'],
    visuals: ['line', 'pie'],
  },
];

export async function GET(request: Request) {
  return NextResponse.json({ kpis }, { status: 200 });
}
