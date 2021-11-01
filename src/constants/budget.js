export const budget = {
  _id: '1',
  description: '2021 Plan',
  startDate: new Date(2021, 0, 1),
  endDate: new Date(2021, 11, 31),
  items: [
    {
      _id: '2',
      budgetId: '1',
      type: 'income',
      description: `Matt's Income`,
      budgetTotal: 3700.43 + 900.3,
      entries: [
        {
          _id: '3',
          itemId: '2',
          month: 3,
          year: 2021,
          value: 3700.43
        },
        {
          _id: '4',
          itemId: '2',
          month: 8,
          year: 2021,
          value: 900.3
        }
      ]
    }
  ]
}


export const items = [
  {
    _id: '2',
    budgetId: '1',
    type: 'income',
    description: `Matt's Income`
  }
]

export const entries = [
  {
    _id: '2',
    itemId: '2',
    month: 3,
    year: 2021,
    value: 3700.43
  }
] 


export default {
  ...budget,
  items,
  entries
};