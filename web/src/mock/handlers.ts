import { http, HttpResponse } from 'msw';

const BASE_URL = 'http://localhost:5000/api';

export const handlers = [
  http.get(`${BASE_URL}/staff`, () => {
    return HttpResponse.json(
      {
        success: true,
        staff: [
          {
            staffId: '1',
            firstName: 'John',
            lastName: 'Doe',
            jobCode: 'MGR',
            job: {
              jobDescription: 'Warehouse Manager',
            },
            userId: 'user-1',
          },
          {
            staffId: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            jobCode: 'SUP',
            job: {
              jobDescription: 'Supervisor',
            },
            userId: 'user-2',
          },
          {
            staffId: '3',
            firstName: 'Mike',
            lastName: 'Johnson',
            jobCode: 'INV',
            job: {
              jobDescription: 'Inventory Specialist',
            },
            userId: 'user-3',
          },
        ],
      },
      { status: 200 }
    );
  }),
];
